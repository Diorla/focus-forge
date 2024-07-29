import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { Profile } from "@/containers/Profile";
import useUser from "@/context/user/useUser";
import goBack from "@/services/routing";
import { Text } from "@rneui/themed";

export default function ProfileScreen() {
  const { user } = useUser();
  return (
    <ParallaxScrollView name="person">
      <ThemedView style={{ marginTop: 10 }}>
        <Text h3 style={{ textAlign: "center" }}>
          {user.name}
        </Text>
      </ThemedView>
      <ThemedView style={{ marginBottom: 10 }}>
        <Text h4 style={{ textAlign: "center" }}>
          {user.email}
        </Text>
      </ThemedView>
      <Profile />
      <ThemedView style={{ alignItems: "center", marginVertical: 40 }}>
        <ThemedButton title="Close" onPress={goBack} />
      </ThemedView>
    </ParallaxScrollView>
  );
}
