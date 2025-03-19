import { encode as base64Encode } from "base-64";
import Config from "react-native-config";
import getUserLoginData from "../helper/getUserLoginData";

export async function getAllUsers(): Promise<any> {
    const connectionString = `${Config.API_BASE_URL}/api/users`;
    
    var usercreds = await getUserLoginData();
    
    var result;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + base64Encode(`${usercreds.name}:${usercreds.pw}`));

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
        result = data;
    })
    .catch(err => {
        console.error("Fetch Error:", err);
    });

    return result;
}
