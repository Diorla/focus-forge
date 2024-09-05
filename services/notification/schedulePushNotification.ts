import * as Notifications from "expo-notifications";

interface Content {
  title: string;
  body: string;
  data: Record<string, unknown>;
}

export default async function schedulePushNotification(
  content: Content,
  seconds: number
) {
  return await Notifications.scheduleNotificationAsync({
    content: {
      ...content,
      sound: "tone.wav",
    },
    trigger: { seconds },
  });
}
