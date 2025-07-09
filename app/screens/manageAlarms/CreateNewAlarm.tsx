import { View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { createAlarm } from '@/scripts/postRequests/createAlarm';
import DefaultButton from '@/components/DefaultButton';
import { Stack } from "expo-router";

export default function CreateNewAlarm() {
  const [alarmMessage, setAlarmMessage] = useState('');
  const [date, setDate] = useState(new Date())

  async function send(){
    await createAlarm(date, alarmMessage);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Neuer Alarm" }} />
      <DatePicker date={date} onDateChange={setDate} />

      <TextInput
        style={styles.textInput}
        onChangeText={setAlarmMessage}
        value={alarmMessage}
        placeholder="Alarm Nachricht"
        keyboardType="default"
        multiline
        returnKeyType="default"
      />

      <DefaultButton 
        onPress={send}
        style={styles.button}
        title='Alarm senden'
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