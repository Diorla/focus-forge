import { scheduleNotificationAsync } from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import useNotification from "./hooks/useNotification";
import { clearBadges } from "./services/clearBadges";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const { notification, expoPushToken } = useNotification();
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press me"
        onPress={() => async () => {
          await scheduleNotificationAsync({
            content: {
              title: "You've got mail! 📬",
              body: "Here is the notification body",
              data: { data: "goes here" },
            },
            trigger: { seconds: 10 },
          });
        }}
      />

      <Button title="Clear badges" onPress={clearBadges} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
