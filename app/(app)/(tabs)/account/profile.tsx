import { Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import useUser from "@/context/user/useUser";

export default function TabTwoScreen() {
  const { user } = useUser();
  return (
    <ParallaxScrollView name="person">
      <ThemedView>
        <ThemedText>User id: {user.id}</ThemedText>
      </ThemedView>
      <Pressable onPress={() => router.back()}>
        <ThemedText type="link">Close</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}
