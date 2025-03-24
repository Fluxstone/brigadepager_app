import { encode as base64Encode } from "base-64";
import getUserLoginData from "../helper/getUserLoginData";
import Constants from "expo-constants";

//Todo: Add input verification. Also manipulating someone elses device token is still possible here
export async function manageDeviceToken(staffId: string, deviceToken: string): Promise<any> {

    const apiUrl = Constants.expoConfig?.extra?.API_BASE_URL;
    const connectionString = `${apiUrl}/api/staff/deviceToken`;
    
    var result;

    var usercreds = await getUserLoginData();
    
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + base64Encode(`${usercreds.name}:${usercreds.pw}`));

    try {
        const response = await fetch(connectionString, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                staffId: staffId,
                deviceToken: deviceToken,
            }),
        });

        if(!response.ok){
            console.error(`HTTP error with status ${response.status} for request`);
            console.error("Response body:", await response.text());
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        result = await response.json();        
    } catch (error) {
        console.error("Fetch or parsing error while performing call (getAllAlarmResponses.ts):", error);
        console.error("Connection string:", connectionString);
        console.error("Headers used:", headers);
    }

    return result;
}
