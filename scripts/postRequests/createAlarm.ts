import { encode as base64Encode } from "base-64";
import * as SecureStore from 'expo-secure-store';
import { getServerURL, getUserLoginData } from "../helper/getSecureStorageItems";
import { formatInTimeZone } from 'date-fns-tz';

export async function createAlarm(time: Date, message: string): Promise<any> {

    const apiUrl = await getServerURL();
    const connectionString = `${apiUrl}/api/alarms`;
    
    var result;

    var usercreds = await getUserLoginData();
    var CSRFToken = await SecureStore.getItemAsync("CSRF_Token");

    //TODO: This should not be hardcoded. Need a timezone setter of some sort!
    const berlinTimeISO = formatInTimeZone(time, 'Europe/Berlin', 'yyyy-MM-dd HH:mm:ss');
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + base64Encode(`${usercreds.name}:${usercreds.pw}`));
    headers.append("X-XSRF-TOKEN", `${CSRFToken}`)

    try {
        const response = await fetch(connectionString, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                time: berlinTimeISO,
                message: message,
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
