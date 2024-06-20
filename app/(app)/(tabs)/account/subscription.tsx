import { Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import goBack from "@/services/routing";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView name="star">
      <ThemedView>
        <ThemedText>This is where you can update your subscription</ThemedText>
      </ThemedView>
      <Pressable onPress={() => goBack()}>
        <ThemedText type="link">Close</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}
