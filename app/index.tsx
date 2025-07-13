import {StyleSheet, View} from 'react-native';
import React from 'react';
import performLoginAttempt from '../scripts/loginHelper'
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import DefaultButton from '@/components/DefaultButton';
import DefaultTextBox from '@/components/DefaultTextBox';
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function Login() {

  const [serverAddress, setServerAddress] = React.useState('');
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  React.useEffect(() => {
    const fetchLogin = async () => {
      //TODO: Could be getUserLoginData()?
      const user_name = await SecureStore.getItemAsync("user_name");
      const user_pw = await SecureStore.getItemAsync("user_pw");

      if(user_name == null && user_pw == null) {
        //If user is not logged in
        console.error("Missing Credentials, please Log In");
      } else {
        console.log("Logging in");
        router.replace("/(tabs)/home");
      }
    };

    fetchLogin();
  }, []);

  //TODO: Needs propper Errors that are not console.logs()
  async function login(){
    var result = await performLoginAttempt(username, password, serverAddress);
    if(result === true) {
      console.log("Logging in");
      router.replace("/(tabs)/home");
    } else {
      console.error("Login not successfull. Check PW.")
    }
  }

  return (
    <View style={styles.viewContainer}>
      <Stack.Screen options={{ title: "Login" }} />
      <DefaultTextBox 
        onChangeText={setServerAddress}
        textValue={serverAddress}
        placeholder={"Server Addresse"}
        secureTextEntry={false}
        style={styles.textInput}
      />

      <DefaultTextBox 
        onChangeText={onChangeUsername}
        textValue={username}
        placeholder={"Nutzername"}
        secureTextEntry={false}
        style={styles.textInput}
      />

      <DefaultTextBox 
        onChangeText={onChangePassword}
        textValue={password}
        placeholder={"Password"}
        secureTextEntry={true}
        style={styles.textInput}
      />

      <DefaultButton 
        onPress={login}
        style={styles.button}
        title='Login'
      />
      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "90%",
    marginBottom: 6
  },
  button: {
    width: "90%",
  },
});