import * as Notifications from "expo-notifications";
import { ThemeProvider } from "@rneui/themed";
import theme from "./constants/theme";
import { StatusBar } from "expo-status-bar";
import UserProvider from "./context/user";
import Root from "./Root";
import "expo-dev-client";
import ErrorBoundary from "react-native-error-boundary";
import { logError } from "./services/database";
import { Button, View, Text, GestureResponderEvent } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import DataProvider from "./context/data";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// TODO: Add drawer for things like history, stats, profile etc and collapse the history
const CustomFallback = (props: {
  error: Error;
  resetError: (event: GestureResponderEvent) => void;
}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Something went wrong</Text>
      <Text>{props.error.toString()}</Text>
      <Button
        title="Try again"
        onPress={(event) => {
          logError("custom fall back", "page load", props.error);
          props.resetError(event);
        }}
      />
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary
        onError={(error) => logError("error boundary", "uncaught error", error)}
        FallbackComponent={CustomFallback}
      >
        <ToastProvider>
          <DataProvider>
            <UserProvider>
              <View style={{ height: "100%" }}>
                <Root />
              </View>
              <StatusBar style="auto" />
            </UserProvider>
          </DataProvider>
        </ToastProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
