import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import React from 'react';
import performLoginAttempt from '../scripts/loginHelper'
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

export default function Login() {

  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  React.useEffect(() => {
    const fetchTokens = async () => {
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
    fetchTokens();
  }, []);

  function login(){
    performLoginAttempt(username, password);
  }

  return (
    <View style={styles.viewContainer}>
      <TextInput
          style={styles.textInput}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Nutzername"
          keyboardType="default"
      />

      <TextInput
          style={styles.textInput}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
      />

      <Pressable onPress={login} style={styles.loginButton} android_ripple={{ color: "#ffffff50" }}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
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
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  loginButtonText: {
    color: "white",
  },
});