import * as Notifications from "expo-notifications";
import { ThemeProvider } from "@rneui/themed";
import theme from "./constants/theme";
import { StatusBar } from "expo-status-bar";
import UserProvider from "./context/user";
import Root from "./Root";
import "expo-dev-client";
import ErrorBoundary from "react-native-error-boundary";
import { logError } from "./services/database";
import { Button, View, Text } from "react-native";
import SQLiteProvider from "./context/sqlite";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const CustomFallback = (props: { error: Error }) => (
  <View>
    <Text>Something happened!</Text>
    <Text>{props.error.toString()}</Text>
    <Button title={"Try again"} />
  </View>
);

export default function App() {
  return (
    <ErrorBoundary
      onError={(error) => logError("error boundary", "uncaught error", error)}
      FallbackComponent={CustomFallback}
    >
      <SQLiteProvider>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <Root />
            <StatusBar style="auto" />
          </UserProvider>
        </ThemeProvider>
      </SQLiteProvider>
    </ErrorBoundary>
  );
}
