import { ActivityIndicator } from "react-native";
import { ThemedView } from "./ThemedView";

export default function PageLoader() {
  return (
    <ThemedView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ActivityIndicator />
    </ThemedView>
  );
}
