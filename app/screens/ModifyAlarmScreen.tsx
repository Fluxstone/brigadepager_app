import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { editAlarm } from '@/scripts/postRequests/editAlarm';

//TODO: This needs a success message when the alarm is updated.
//TODO: Add a way to change the attendance of certain staff
export default function ModifyAlarmScreen() {
    const { alarm } = useLocalSearchParams();
    const alarmData = alarm ? JSON.parse(alarm as string) : null;
  
    var initAlarmMessage = alarmData.message ?? '';
    var alarmId = alarmData.id;

    const [alarmText, onChangeAlarmText] = useState(initAlarmMessage);

    function send(){
      editAlarm(alarmId, alarmText);
    }

    return (
      <View>
        <TextInput
          style={styles.alarmMessage}
          onChangeText={onChangeAlarmText}
          value={alarmText}
          multiline
        />

        <Pressable onPress={send} style={styles.loginButton} android_ripple={{ color: "#ffffff50" }}>
          <Text style={styles.loginButtonText}>Update</Text>
        </Pressable>
      </View>
    );
  }

  //TODO: Change class names
  const styles = StyleSheet.create({
    alarmMessage: {
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
    loginButtonText: {
      color: "white",
    },
  });