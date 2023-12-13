import * as Notifications from "expo-notifications";

interface Content {
  title: string;
  body: string;
  data: Record<string, any>;
}

export default async function schedulePushNotification(
  content: Content,
  seconds: number
) {
  await Notifications.scheduleNotificationAsync({
    content,
    trigger: { seconds },
  });
}
