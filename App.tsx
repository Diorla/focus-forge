import * as Notifications from "expo-notifications";
import { ThemeProvider } from "@rneui/themed";
import theme from "./constants/theme";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import UserProvider from "./context/user";
import Root from "./Root";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <View style={{ marginTop: 32 }}>
          <Root />
          <StatusBar style="auto" />
        </View>
      </UserProvider>
    </ThemeProvider>
  );
}
