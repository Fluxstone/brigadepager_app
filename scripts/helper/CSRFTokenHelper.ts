import { encode as base64Encode } from "base-64";
import {setItemAsync} from 'expo-secure-store';
import Constants from 'expo-constants';

async function saveCSRF(CSRFKey: string) {    
    await setItemAsync("CSRF_Token", CSRFKey);
}

export async function getCSRFToken(usr?: string, pw?: string, addr?: string): Promise<void> {
    const connectionString = `${addr}/api/csrf-token`;
    
    if (usr == null || pw == null) {
        throw new Error("Both username and password must be provided together.");
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + base64Encode(`${usr}:${pw}`));

    try {
        const response = await fetch(connectionString, {
            method: "GET",
            headers: headers
        });
    
        if(!response.ok){
            console.error(`HTTP error with status ${response.status} for CSRF request`);
            console.error("Response body:", await response.text());
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        await saveCSRF(data.token);
    } catch (error) {
        console.error("Fetch or parsing error while fetching CSRF token:", error);
        console.error("Connection string:", connectionString);
        console.error("Headers used:", headers);
    }
}
