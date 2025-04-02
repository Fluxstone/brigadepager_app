import { View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { editAlarm } from '@/scripts/postRequests/editAlarm';
import DefaultButton from '@/components/DefaultButton';
import { Stack } from "expo-router";

//TODO: This needs a success message when the alarm is updated.
//TODO: Add a way to change the attendance of certain staff
export default function ModifyAlarmScreen() {
    const { alarm } = useLocalSearchParams();
    const alarmData = alarm ? JSON.parse(alarm as string) : null;
  
    var initAlarmMessage = alarmData.message ?? '';
    var alarmId = alarmData.id;

    const [alarmText, onChangeAlarmText] = useState(initAlarmMessage);

    async function send(){
      await editAlarm(alarmId, alarmText);
    }

    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Alarm bearbeiten" }} />
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeAlarmText}
          value={alarmText}
          placeholder="Alarm Nachricht"
          keyboardType="default"
          multiline
          returnKeyType="default"
        />

        <DefaultButton 
          onPress={send}
          style={styles.button}
          title='Alarm aktualisieren'
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    textInput: {
      height: 80,
      width: "90%",
      borderWidth: 1,
      padding: 10,
      borderRadius: 6,
      marginTop: 8,
    },
    button: {
      width: "90%",
      marginTop: 8,
    },
  });