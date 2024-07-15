import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";
import useUser from "@/context/user/useUser";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import UserModel from "@/context/user/UserModel";
import PageLoader from "@/components/PageLoader";
import { Colors } from "@/constants/Colors";
import { createTheme, ThemeProvider as RNEThemeProvider } from "@rneui/themed";
import { ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import DarkTheme from "@/constants/DarkTheme";
import DefaultTheme from "@/constants/DefaultTheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const isFirstTime = (user: UserModel) => {
  if (user.id) {
    if (user.name) {
      if (user.useWeeklyQuota && user.weeklyQuota > 0) return false;
      if (user.dailyQuota.reduce((prev, next) => prev + next) > 0) return false;
    }
  }
  return true;
};

function Wrapper() {
  const { user, loading } = useUser();

  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (loading) return <PageLoader />;
  if (isFirstTime(user)) return <Redirect href="/sign-in" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function AppLayout() {
  const { theme } = useUser();
  const RNETheme = createTheme({
    lightColors: Colors.light,
    darkColors: Colors.dark,
    components: {
      Button: {
        raised: true,
      },
    },
    mode: theme.dark ? "dark" : "light",
  });
  return (
    <RNEThemeProvider theme={RNETheme}>
      <ThemeProvider value={theme.dark ? DarkTheme : DefaultTheme}>
        <StatusBar style={theme.dark ? "light" : "dark"} />
        <Wrapper />
      </ThemeProvider>
    </RNEThemeProvider>
  );
}
