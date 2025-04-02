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
import DefaultButton from '@/components/DefaultButton';

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
  
  /*Description:  This function combines alarms and the corresponding responses
                  and returns an CombinedAlarm Array  
  */              
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
      pathname: '/screens/manageAlarms/ModifyAlarmScreen',
      params: { alarm: JSON.stringify(item) },
    });
  }

  function navigateToCreateNewAlarm(){
    router.push('/screens/manageAlarms/CreateNewAlarm');
  }

  return (
    <View style={styles.container}>
      <DefaultButton 
        onPress={navigateToCreateNewAlarm}
        style={styles.button}
        title='Neuer Alarm'
      />

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
  button: {
    width: "90%",
    marginTop: 8,
    marginBottom: 8
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
