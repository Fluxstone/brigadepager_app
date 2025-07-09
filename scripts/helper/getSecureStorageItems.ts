import * as SecureStore from 'expo-secure-store';

//Get CSRF Token from secure storage
async function fetchUserLoginDataFromSecureStorage() {
    var name = await SecureStore.getItemAsync("user_name");
    var pw = await SecureStore.getItemAsync("user_pw");
    return {name, pw};
}

async function fetchServerUrlfromSecureStorage() {
    return await SecureStore.getItemAsync("server_address");
}

export async function getUserLoginData() {
    return await fetchUserLoginDataFromSecureStorage();
}

export async function getServerURL() {
    return await fetchServerUrlfromSecureStorage();
}
