import { Platform } from "react-native";
import { ThemedView } from "./ThemedView";

export default function TopSpace() {
  if (Platform.OS === "ios") return <ThemedView style={{ height: 50 }} />;
  if (Platform.OS === "android") return <ThemedView style={{ height: 28 }} />;
  return null;
}
