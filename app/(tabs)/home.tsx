import { View, Text, StyleSheet } from 'react-native';
import React, {useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";

export default function Tab() {
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {

      const userFirstNameValue = await SecureStore.getItemAsync("user_firstName");
      const userLastNameValue = await SecureStore.getItemAsync("user_lastName");
      const isAdminValue = await SecureStore.getItemAsync("user_isAdmin");

      const isAdmin = isAdminValue === "true" ? true : false;

      setUserFirstName(userFirstNameValue);
      setUserLastName(userLastNameValue);

      setUserIsAdmin(isAdmin);
    };
    fetchUserData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Guten Tag {userIsAdmin === null ? "" : "Admin" } {userFirstName} {userLastName} !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
