import messaging from '@react-native-firebase/messaging';

//TODO: Catch errors in Auth Status here
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
}

function setNotifListeners() : void {
    messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });
}

export default function notificationSetup(){
    //TODO: Migrate if possible. See -> https://rnfirebase.io/migrating-to-v22
    // @ts-ignore
    globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
    requestUserPermission();
    setNotifListeners();
}
