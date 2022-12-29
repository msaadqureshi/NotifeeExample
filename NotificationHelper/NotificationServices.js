import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    // console.log('Authorization status:', authStatus);
    await getfcmToken();
  }
}

export const getfcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, 'the old fsmtoken');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        // console.log(fcmToken, 'the new fsmtoken');
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      // console.log('fcmToken error', error);
    }
  }
};

// export const notificationListener = async () => {
//   const Token = await AsyncStorage.getItem('Token');
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage,
//     );
//     // if (Token !== null) {
//     //   if (navigationRef.isReady()) {
//     //     navigationRef.navigate('NavApp', {screen: 'Notifications'});
//     //   }
//     // }
//   });

//   // Check whether an initial notification is available
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//         // if (Token !== null) {
//         //   if (navigationRef.isReady()) {
//         //     navigationRef.navigate('NavApp', {screen: 'Notifications'});
//         //   }
//         // }
//       }
//     });

//   // messaging().onMessage(async remoteMessage => {
//   //   console.log('recived in foreground', remoteMessage);
//   // });
// };
