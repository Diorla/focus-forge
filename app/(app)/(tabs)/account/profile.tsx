import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { Profile } from "@/containers/Profile";
import goBack from "@/services/routing";

export default function ProfileScreen() {
  return (
    <ParallaxScrollView name="person">
      <Profile />
      <ThemedView style={{ alignItems: "center", marginVertical: 40 }}>
        <ThemedButton title="Close" onPress={goBack} />
      </ThemedView>
    </ParallaxScrollView>
  );
}
