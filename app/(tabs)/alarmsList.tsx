import { getAllAlarmResponses } from '@/scripts/getRequests/getAllAlarmResponses';
import { getAllAlarms } from '@/scripts/getRequests/getAllAlarms';
import { getAllStaff } from '@/scripts/getRequests/getAllStaff';
import { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { Alarm, AlarmResponse, CombinedAlarm, Staff } from '@/scripts/types';
import AlarmCard from '@/components/AlarmCard';
import { router } from 'expo-router';

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
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchData();
    }, [])
  );

  useEffect(() => {
    if (alarms.length && responses.length && staff.length) {
      setCombinedAlarm(combineAlarmAndResponses());
    }
  }, [alarms, responses, staff]);
  
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

  function navigateToEditAlarm(item: any){
    router.push({
      pathname: '/screens/ModifyAlarmScreen',
      params: { alarm: JSON.stringify(item) }, // stringify if it's an object
    });
  }

  function navigateToCreateNewAlarm(){
    router.push('/screens/CreateNewAlarm');
  }

  return (
    <View>
      <Pressable onPress={navigateToCreateNewAlarm} style={styles.loginButton} android_ripple={{ color: "#ffffff50" }}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    <FlatList
      data={combinedAlarms}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigateToEditAlarm(item)}>
          <AlarmCard item={item} />
        </Pressable>
      )}
      ListEmptyComponent={<Text>No alarms found.</Text>}
    />
    </View>
  );
}

const styles = StyleSheet.create({
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
