import { Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import goBack from "@/services/routing";
import SettingsContainer from "@/containers/Settings";

export default function Settings() {
  return (
    <ParallaxScrollView name="cog">
      <SettingsContainer />
      <Pressable style={{ alignItems: "center" }} onPress={() => goBack()}>
        <ThemedText type="link">Close</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}
