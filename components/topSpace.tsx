import { Platform, View } from "react-native";

export default function TopSpace() {
  if (Platform.OS === "ios") return <View style={{ height: 50 }} />;
  if (Platform.OS === "android") return <View style={{ height: 28 }} />;
  return null;
}
