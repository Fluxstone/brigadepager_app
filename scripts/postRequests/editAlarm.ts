import { encode as base64Encode } from "base-64";
import { getServerURL, getUserLoginData } from "../helper/getSecureStorageItems";
import * as SecureStore from 'expo-secure-store';

//TODO: Check if JPARepo can just take care of this route. Maybe the route can be removed in the backend
export async function editAlarm(alarmId: string, alarmMessage: string): Promise<any> {

    const apiUrl = await getServerURL();
    const connectionString = `${apiUrl}/api/alarms/editAlarm`;
    
    var result;

    var usercreds = await getUserLoginData();
    var CSRFToken = await SecureStore.getItemAsync("CSRF_Token");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + base64Encode(`${usercreds.name}:${usercreds.pw}`));
    headers.append("X-XSRF-TOKEN", `${CSRFToken}`)
    try {
        const response = await fetch(connectionString, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                alarmId: alarmId,
                alarmMessage: alarmMessage,
            }),
        });

        if(!response.ok){
            console.error(`HTTP error with status ${response.status} for request`);
            console.error("Response body:", await response.text());
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        //TODO: I should ALWAYS expect a json or need to build another Intecteptor for this.
        result = await response;        
    } catch (error) {
        console.error("Fetch or parsing error while performing call (getAllAlarmResponses.ts):", error);
        console.error("Connection string:", connectionString);
        console.error("Headers used:", headers);
    }

    return result;
}
