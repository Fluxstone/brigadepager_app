import { encode as base64Encode } from "base-64";
import Config from "react-native-config";

let csrfToken: string | null = null;

export async function getCSRFToken(): Promise<void> {
    const connectionString = `${Config.API_BASE_URL}/api/csrf-token`;

    var userName = "mail@prov.de";
    var pw = "pass";

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + base64Encode(`${userName}:${pw}`));

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
        csrfToken = data.token;        
    })
    .catch(err => {
        console.error("Fetch Error:", err);
    });
}
