import { Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import goBack from "@/services/routing";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView name="timer">
      <ThemedView>
        <ThemedText>
          This is where you find all the logs of the activities you've done
        </ThemedText>
      </ThemedView>
      <Pressable onPress={() => goBack()}>
        <ThemedText type="link">Close</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}
