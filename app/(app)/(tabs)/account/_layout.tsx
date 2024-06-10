import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="form" />
      <Stack.Screen name="password" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="subscription" />
    </Stack>
  );
}
