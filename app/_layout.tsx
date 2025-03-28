import notificationSetup from '@/scripts/notificationSetup';
import { Stack } from 'expo-router/stack';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getCSRFToken } from '@/scripts/CSRFTokenHelper';

export default function Layout() {

  //TODO: Build an interceptor for this!
  async function forceCSRFRefresh(){
    const user_name = await SecureStore.getItemAsync("user_name");
    const user_pw = await SecureStore.getItemAsync("user_pw");

    if(user_name != null && user_pw != null){
      await getCSRFToken(user_name, user_pw);
    }
  }


  useEffect(() => {
    forceCSRFRefresh();
    notificationSetup();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
