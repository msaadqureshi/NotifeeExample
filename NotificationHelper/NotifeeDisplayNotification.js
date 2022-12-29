import React from 'react';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

export default async function getNotifeeNotification(remoteMessage) {
  console.log('remoteMessage getNotifeeNotification >>>', remoteMessage);

  // Display a notification
  try {
    if (Platform.OS == 'ios') {
      notifee.requestPermission({
        sound: true,
        criticalAlert: true,
      });
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        ios: {
          // iOS resource (.wav, aiff, .caf)
          sound: 'ringtone.wav',
          critical: true,
        },
      });
    } else {
      // Create a channel for android
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'ringtone',
        vibration: true,
        vibrationPattern: [300, 500],
        importance: AndroidImportance.HIGH,
      });
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          timestamp: Date.now(),
          showTimestamp: true,
          // sound: 'ringtone',
          // vibration: true,
          // vibrationPattern: [300, 500],
          // importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
            launchActivity: 'default',
          },
        },
      });
    }
  } catch (e) {
    // console.log('displayNotification catch error ', e);
  }
}
