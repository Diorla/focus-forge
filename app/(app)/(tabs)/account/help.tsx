import { Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import goBack from "@/services/routing";

export default function HelpScreen() {
  return (
    <ParallaxScrollView name="help">
      <ThemedView>
        <ThemedText>This is where you find all the help you need</ThemedText>
      </ThemedView>
      <Pressable onPress={() => goBack()}>
        <ThemedText type="link">Close</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}
