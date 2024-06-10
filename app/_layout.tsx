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
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ToastProvider>
      <UserProvider>
        <DataProvider>
          <ScheduleProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Slot />
            </ThemeProvider>
          </ScheduleProvider>
        </DataProvider>
      </UserProvider>
    </ToastProvider>
  );
}
