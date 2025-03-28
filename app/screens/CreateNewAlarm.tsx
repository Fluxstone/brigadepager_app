import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { createAlarm } from '@/scripts/postRequests/createAlarm';

export default function CreateNewAlarm() {
  const [alarmMessage, setAlarmMessage] = useState('');

  const [date, setDate] = useState(new Date())

  function send(){
    createAlarm(date, alarmMessage);
  }

  return (
    <View>
      <Text>Create Alarm</Text>

      <DatePicker date={date} onDateChange={setDate} />

      <TextInput
        style={styles.textInput}
        onChangeText={setAlarmMessage}
        value={alarmMessage}
        placeholder="Alarm Message"
        keyboardType="default"
        multiline
        returnKeyType="default"
      />

      <Pressable onPress={send} style={styles.loginButton} android_ripple={{ color: "#ffffff50" }}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButtonText: {
    color: "white",
  },
  textInput: {
    height: 80,
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
});