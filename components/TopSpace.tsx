import { Platform } from "react-native";
import { ThemedView } from "./ThemedView";

export default function TopSpace() {
  if (Platform.OS === "ios")
    return (
      <ThemedView style={{ height: 50, backgroundColor: "transparent" }} />
    );
  if (Platform.OS === "android")
    return (
      <ThemedView style={{ height: 28, backgroundColor: "transparent" }} />
    );
  return null;
}
