import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import {getItemAsync} from "expo-secure-store";
import {manageDeviceToken} from "@/scripts/postRequests/manageDeviceToken";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

//Todo: Needs to respect users choice of Push Notifs (ALLOW / DISALLOW)
async function getFcmToken() {
    try {
        const token = await messaging().getToken();
        if (token) {
            console.log('FCM Token:', token);
            const staffId = await getItemAsync("user_staffId");
            if(staffId) {
                await manageDeviceToken(staffId, token);
            }
        } else {
            console.warn('FCM token not received');
        }
    } catch (error) {
        console.error('Error getting FCM token:', error);
    }
}

//TODO: Catch errors in Auth Status here
async function requestUserPermission() {
    const settings = await Notifications.requestPermissionsAsync();
    const granted = settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
    console.log("Notification permissions granted:", granted);
    await getFcmToken();
}

function setNotifListeners(): void {
    messaging().onMessage(async remoteMessage => {
        console.log('FCM message (foreground):', JSON.stringify(remoteMessage));

        const { title, body } = remoteMessage.notification ?? {};
        if (title || body) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: title ?? 'Neue Nachricht',
                    body: body ?? '',
                    data: remoteMessage.data,
                },
                trigger: null,
            });
        }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('FCM message (background):', JSON.stringify(remoteMessage));

        const { title, body } = remoteMessage.notification ?? {};
        if (title || body) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: title ?? 'Neue Nachricht',
                    body: body ?? '',
                    data: remoteMessage.data,
                },
                trigger: null,
            });
        }
    });
}

export default function notificationSetup(){
    //TODO: Migrate if possible. See -> https://rnfirebase.io/migrating-to-v22
    // @ts-ignore
    globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
    requestUserPermission();
    setNotifListeners();
}
