import * as SecureStore from 'expo-secure-store';

//Get CSRF Token from secure storage
async function fetchCSRFfromSecureStorage() {
    var name = await SecureStore.getItemAsync("user_name");
    var pw = await SecureStore.getItemAsync("user_pw");
    return {name, pw};
}

export default async function getUserLoginData() {
    return await fetchCSRFfromSecureStorage();
}