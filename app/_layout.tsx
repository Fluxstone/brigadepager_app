import notificationSetup from '@/scripts/notificationSetup';
import { Stack } from 'expo-router/stack';
import { useEffect } from 'react';

export default function Layout() {
  useEffect(() => {    
    notificationSetup();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
