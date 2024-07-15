import { ThemedView } from "@/components/ThemedView";
import ThemePicker from "./ThemePicker";

/**
 * theme
 * date settings
 * notifications
 * @returns
 */

export default function SettingsContainer() {
  return (
    <ThemedView style={{ marginTop: 20, paddingStart: 8 }}>
      <ThemePicker />
    </ThemedView>
  );
}
