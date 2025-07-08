import { encode as base64Encode } from "base-64";
import * as SecureStore from 'expo-secure-store';
import { getCSRFToken } from "./helper/CSRFTokenHelper";

//Get CSRF Token from secure storage
async function fetchCSRFfromSecureStorage() {
    return await SecureStore.getItemAsync("CSRF_Token");
}

//TODO: Has to return the error when it gets one.
//Desc: Login function. Fetches Staff data. This is to check if the user login is correct.
async function login(usr:string, pw:string, serverAddr: string) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + base64Encode(`${usr}:${pw}`));

    const connectionString = `${serverAddr}/api/staff/getByEmail/${usr}`;
    
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

//If login result is ok save user creds and additional info to secure storage. Then return true
//and log user in
export default async function performLoginAttempt(usr:string, pw:string, serverAddr: string) : Promise<any>{

    //IF Csrf is not yet set get CSRF from Backend & save it    
    if(await fetchCSRFfromSecureStorage() == null){
        await getCSRFToken(usr, pw);
    }

    //Try logging in using the provided data.
    const result = await login(usr, pw, serverAddr);
    
    //On fail... & return FAILURE.
    if(result === undefined){
        //TODO: Propper error handeling needed (401, 403, CSRF Expire)
        console.error("Login and/or CSRF Token error!");
        return false;
    }

    //On success save userdata & return OK
    await SecureStore.setItemAsync("user_name", usr);
    await SecureStore.setItemAsync("user_pw", pw);
    await SecureStore.setItemAsync("server_address", serverAddr);
    await SecureStore.setItemAsync("user_staffId", result.id);
    await SecureStore.setItemAsync("user_deviceToken", result.deviceToken);

    return true;
}
