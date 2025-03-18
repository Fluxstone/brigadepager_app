import { encode as base64Encode } from "base-64";
import {setItemAsync} from 'expo-secure-store';
import Config from "react-native-config";

async function saveCSRF(CSRFKey: string) {    
    await setItemAsync("CSRF_Token", CSRFKey);
}

export async function getCSRFToken(usr?: string, pw?: string): Promise<void> {
    const connectionString = `${Config.API_BASE_URL}/api/csrf-token`;

    if ((usr && !pw) || (!usr && pw)) {
        throw new Error("Both username and password must be provided together.");
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + base64Encode(`${usr}:${pw}`));

    await fetch(connectionString, {
        method: "GET",
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        saveCSRF(data.token);  
    })
    .catch(err => {
        console.error("Fetch Error:", err);
    });
}
