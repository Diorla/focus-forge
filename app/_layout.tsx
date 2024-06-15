import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import "react-native-reanimated";
import UserProvider from "@/context/user";
import DataProvider from "@/context/data";
import { ToastProvider } from "react-native-toast-notifications";
import ScheduleProvider from "@/context/schedule";
import { GestureResponderEvent, useColorScheme } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { logError } from "@/services/database";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";

const CustomFallback = (props: {
  error: Error;
  resetError: (event: GestureResponderEvent) => void;
}) => {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Something went wrong</ThemedText>
      <ThemedText>{props.error.toString()}</ThemedText>
      <ThemedButton
        title="Try again"
        onPress={(event) => {
          logError("custom fall back", "page load", props.error);
          props.resetError(event);
        }}
      />
    </ThemedView>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <ErrorBoundary
        onError={(error) => logError("error boundary", "uncaught error", error)}
        FallbackComponent={CustomFallback}
      >
        <ToastProvider>
          <DataProvider>
            <ScheduleProvider>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <Slot />
              </ThemeProvider>
            </ScheduleProvider>
          </DataProvider>
        </ToastProvider>
      </ErrorBoundary>
    </UserProvider>
  );
}
