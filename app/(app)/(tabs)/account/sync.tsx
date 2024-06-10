import { Pressable, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView name="server">
      <ThemedView>
        <ThemedText>This is where you import or sync your data</ThemedText>
        <ThemedText>
          It will show you the date of local and server data were last updated.
          You can also see the difference between the two. It will be possible
          to merge them too
        </ThemedText>
      </ThemedView>
      <Pressable onPress={() => router.back()}>
        <ThemedText type="link">Close</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
