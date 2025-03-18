import { encode as base64Encode } from "base-64";
import * as SecureStore from 'expo-secure-store';
import { getCSRFToken } from "./CSRFTokenHelper";
import Config from "react-native-config";

//Get CSRF Token from secure storage
async function fetchCSRFfromSecureStorage() {
    var result = await SecureStore.getItemAsync("CSRF_Token");
    return result;
}

//TODO: Has to return the error when it gets one.
//Login function. On success the usr_name and usr_pw are correct will return
//result
async function login(usr:string, pw:string) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + base64Encode(`${usr}:${pw}`));

    const connectionString = `${Config.API_BASE_URL}/api/users/${usr}`;
    
    var result;

    await fetch(connectionString, {
        method: "GET",
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        console.log(data);
        result = data;
    })
    .catch(err => {
        console.error("Fetch Error:", err);
    });

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
