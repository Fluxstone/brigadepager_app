import { getAllAlarmResponses } from '@/scripts/getRequests/getAllAlarmResponses';
import { getAllAlarms } from '@/scripts/getRequests/getAllAlarms';
import { getAllStaff } from '@/scripts/getRequests/getAllStaff';
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Alarm, AlarmResponse, CombinedAlarm, Staff } from '@/scripts/types';

export default function Tab() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [responses, setResponses] = useState<AlarmResponse[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [combinedAlarms, setCombinedAlarm] = useState<CombinedAlarm[]>([]);
  
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const [alarmsResult, responsesResult, staffResult] = await Promise.all([
            getAllAlarms(),
            getAllAlarmResponses(),
            getAllStaff(),
          ]);
  
          setAlarms(alarmsResult);
          setResponses(responsesResult);
          setStaff(staffResult);
  
          setCombinedAlarm(combineAlarmAndResponses());
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchData();
    }, [])
  );

  //Creates an array containing the alarms AND the positive and negative responses.
  function combineAlarmAndResponses(): CombinedAlarm[] {
    //Add clear names to each response
    //TODO: Make this an API point in the backend
    const responsesWithNames = responses.map(response => {
      const staffMember = staff.find(s => s.id === response.staffId);
      return {
        ...response,
        staffName: staffMember ? `${staffMember.firstName} ${staffMember.lastName}` : 'Unknown'
      };
    });
    
    //Add the positive and negative responses with clear name to the alarms
    const alarmsWithPosAndNegResponses = alarms.map((alarm)=> {
      var alarmResponses = responsesWithNames.filter(r => r.alarmId === alarm.id);
      var positiveResponses = alarmResponses.filter(r => r.response === true);
      var negativeResponses = alarmResponses.filter(r => r.response === false);      

      return {
        ...alarm,
        positiveResponses: positiveResponses,
        negativeResponses: negativeResponses
      }
    });

    return alarmsWithPosAndNegResponses;
  }

  return (
    <View>
    <FlatList
      data={combinedAlarms}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.message}</Text>
          <Text>📅 {item.time}</Text>
          <Text>-------</Text>
          <Text>Positive</Text>
          <FlatList
            data={item.positiveResponses}
            keyExtractor={(response) => response.id}
            renderItem={({ item }) => (
              <Text>{item.staffName}</Text>
            )}
            ListEmptyComponent={<Text>No positive responses</Text>}
          />

          <Text>-------</Text>
          <Text>Negative</Text>
          <FlatList
            data={item.negativeResponses}
            keyExtractor={(response) => response.id}
            renderItem={({ item }) => (
              <Text>{item.staffName}</Text>
            )}
            ListEmptyComponent={<Text>No positive responses</Text>}
          />

        </View>
      )}
      ListEmptyComponent={<Text>No alarms found.</Text>}
    />
    </View>
  );
}
