import { scheduleNotificationAsync } from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { clearBadges, useNotification } from "./services/notification";
import { ThemeProvider } from "@rneui/themed";
import Button from "./components/button";
import theme from "./constants/theme";

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
    <ThemeProvider theme={theme}>
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
        <Button>Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="accent">Accent</Button>
        <Button color="warning">Warning</Button>
        <Button color="error">Error</Button>
        <Button
          title="Press me"
          type="clear"
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
    </ThemeProvider>
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
