import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";
import useUser from "@/context/user/useUser";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import * as SplashScreen from "expo-splash-screen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
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

  if (loading) return <ThemedText>Loading</ThemedText>;
  if (!user.id) return <Redirect href="/sign-in" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
