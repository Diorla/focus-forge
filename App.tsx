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
import SQLiteProvider from "./context/sqlite";
import { ToastProvider } from "react-native-toast-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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
        <ToastProvider
        // successColor={successColor}
        // dangerColor={dangerColor}
        // warningColor={warningColor}
        // normalColor={normalColor}
        >
          <SQLiteProvider>
            <UserProvider>
              <Root />
              <StatusBar style="auto" />
            </UserProvider>
          </SQLiteProvider>
        </ToastProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
