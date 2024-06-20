import { Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import goBack from "@/services/routing";

/**
 * theme
 * date settings
 * notifications
 * @returns
 */
export default function TabTwoScreen() {
  return (
    <ParallaxScrollView name="cog">
      <ThemedView>
        <ThemedText>This is where you can change settings</ThemedText>
      </ThemedView>
      <Pressable onPress={() => goBack()}>
        <ThemedText type="link">Close</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}
