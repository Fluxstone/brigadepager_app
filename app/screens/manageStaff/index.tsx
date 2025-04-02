import { View, StyleSheet, Text, Pressable, FlatList } from 'react-native';
import { useState, useCallback } from 'react'
import { getAllStaff } from '@/scripts/getRequests/getAllStaff';
import { Staff } from '@/scripts/types';
import StaffCard from '@/components/StaffCard';
import { useFocusEffect } from "@react-navigation/native";
import { router, Stack } from 'expo-router';

export default function ManageStaffScreen() {
  const [staff, setStaff] = useState<Staff[]>([]);

  const getStaff = async () => {
    var staff = await getAllStaff()
    setStaff(staff);
  }

  useFocusEffect(
    useCallback(() => {
      getStaff();
    }, [])
  );

  function navigateToEditStaff(item:Staff) {
    router.push({
      pathname: '/screens/manageStaff/editStaffScreen',
      params: { staff: JSON.stringify(item) }, // stringify if it's an object
    });
  }

  return (
    <View>
      <Stack.Screen options={{ title: "Nutzerverwaltung" }} />
      <FlatList
        data={staff}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigateToEditStaff(item)}>
            <StaffCard item={item}/>
          </Pressable>
        )}
        ListEmptyComponent={<Text>No Staff found.</Text>}
      />
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