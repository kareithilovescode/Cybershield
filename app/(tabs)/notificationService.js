import PushNotification from 'react-native-push-notification';

export const configureNotifications = () => {
  PushNotification.configure({
    onRegister: function(token) {
      console.log("TOKEN:", token);
    },
    onNotification: function(notification) {
      console.log("NOTIFICATION:", notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};

export const showLocalNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: "default-channel-id",
    title: title,
    message: message,
    playSound: true,
    soundName: "default",
  });
};