import { View, Text, StyleSheet } from 'react-native';
import React, {useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from '@react-navigation/native';
import {getLatestAlarm} from "@/scripts/getRequests/getLatestAlarm";
import AlarmDisplay from "@/components/AlarmDisplay";

export default function Tab() {
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean | null>(null);
  const [latestAlarm, setLatestAlarm] = useState<any | null>(null);

  useFocusEffect(() => {
    const intervalId = setInterval(async ()=>{
      const laResponse = await getLatestAlarm();
      const dateNow = new Date();
      const dateAlarm = new Date(laResponse.time);
      const diffInMinutes = (dateNow.getTime() - dateAlarm.getTime()) / 1000 / 60;

      //TODO: This should also be a setting!
      if(diffInMinutes<=30){
        setLatestAlarm(laResponse);
      }
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  });

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
      <AlarmDisplay alarm={latestAlarm}></AlarmDisplay>
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
