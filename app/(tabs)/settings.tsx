import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import DefaultButton from '@/components/DefaultButton';
import * as SecureStore from 'expo-secure-store';

export default function Tab() {

  function navigateToManageUsers(){
    router.push("/screens/manageStaff");
  }

  function navigateToLogin(){
    router.replace("/");
  }

  //TODO: Check if these deletes fail. If so dont log user out.
  async function logout() {
    console.log("Logout");
    await SecureStore.deleteItemAsync("user_name");
    await SecureStore.deleteItemAsync("user_pw");
    await SecureStore.deleteItemAsync("server_address");
    await SecureStore.deleteItemAsync("user_staffId");
    await SecureStore.deleteItemAsync("CSRF_Token");
    navigateToLogin();
  }

  return (
    <View style={styles.container}>
      <DefaultButton 
        onPress={navigateToManageUsers}
        style={styles.button}
        title='Nutzerverwaltung'
      />

      <DefaultButton 
        onPress={logout}
        style={styles.button}
        title='Logout'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: "90%",
    marginBottom: 16
  },
});
