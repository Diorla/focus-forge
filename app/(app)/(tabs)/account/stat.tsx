import { Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView name="bar-chart">
      <ThemedView>
        <ThemedText>This is where you see all the stats</ThemedText>
      </ThemedView>
      <Pressable onPress={() => router.back()}>
        <ThemedText type="link">Close</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}
