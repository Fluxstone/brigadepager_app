import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function Tab() {

  function navigateManageUsers(){
    router.push("/screens/ManageStaff");
  }

  function logout() {

  }

  return (
    <View style={styles.container}>
      <Pressable onPress={navigateManageUsers} style={styles.loginButton} android_ripple={{ color: "#ffffff50" }}>
        <Text style={styles.loginButtonText}>Manage Users</Text>
      </Pressable>

      <Pressable onPress={logout} style={styles.loginButton} android_ripple={{ color: "#ffffff50" }}>
        <Text style={styles.loginButtonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
