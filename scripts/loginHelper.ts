import { encode as base64Encode } from "base-64";
import * as SecureStore from 'expo-secure-store';
import { getCSRFToken } from "./CSRFTokenHelper";
import Constants from "expo-constants";

//Get CSRF Token from secure storage
async function fetchCSRFfromSecureStorage() {
    var result = await SecureStore.getItemAsync("CSRF_Token");
    return result;
}

//TODO: Has to return the error when it gets one.
//TODO: Change the API Call to staff instead of user
//Login function. On success the usr_name and usr_pw are correct will return
//result
async function login(usr:string, pw:string) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + base64Encode(`${usr}:${pw}`));

    const apiUrl = Constants.expoConfig?.extra?.API_BASE_URL;
    const connectionString = `${apiUrl}/api/users/${usr}`;
    
    var result;

    try {
        const response = await fetch(connectionString, {
            method: "GET",
            headers: headers
        });
    
        if(!response.ok){
            console.error(`HTTP error with status ${response.status} request(loginHelper.ts)`);
            console.error("Response body:", await response.text());
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        result = response.json();
    } catch (error) {
        console.error("Fetch or parsing error while performing call (loginHelper.ts):", error);
        console.error("Connection string:", connectionString);
        console.error("Headers used:", headers);
    }

    return result;
}

//If login result is ok save usr_name and pw to secure storage. Then return true
//and log user in
export default async function performLoginAttempt(usr:string, pw:string) : Promise<any>{

    //IF Csrf is not yet set get CSRF from Backend & save it    
    if(await fetchCSRFfromSecureStorage() == null){
        await getCSRFToken(usr, pw);
    }

    //Try logging in using the provided data.
    const result = await login(usr, pw);
    
    //On fail... & return FAILURE.
    if(result === undefined){
        //TODO: Propper error handeling needed (401, 403, CSRF Expire)
        console.error("Login and/or CSRF Token error!");
        return false;
    }

    //On success save userdata & return OK
    await SecureStore.setItemAsync("user_name", usr);
    await SecureStore.setItemAsync("user_pw", pw);
    return true;
}
