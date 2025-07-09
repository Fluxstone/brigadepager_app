import { encode as base64Encode } from "base-64";
import { getServerURL, getUserLoginData } from "../helper/getSecureStorageItems";

//Todo: Implement nullchecks ect because bad data could be parsed
export async function getStaffCertifications(certificationId:string): Promise<any> {
    
    const apiUrl = await getServerURL();
    const connectionString = `${apiUrl}/api/certifications/${certificationId}`;
    
    var result;

    var usercreds = await getUserLoginData();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + base64Encode(`${usercreds.name}:${usercreds.pw}`));

    try {
        const response = await fetch(connectionString, {
            method: "GET",
            headers: headers
        });

        if(!response.ok){
            console.error(`HTTP error with status ${response.status} for request`);
            console.error("Response body:", await response.text());
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        result = await response.json();        
    } catch (error) {
        console.error("Fetch or parsing error while performing call (getStaffCertifications.ts):", error);
        console.error("Connection string:", connectionString);
        console.error("Headers used:", headers);
    } 

    return result;
}
