import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { A } from "@expo/html-elements";
import { Image } from "react-native";

export const playstoreURL =
  "https://play.google.com/apps/internaltest/4701741635523691470";

export default function Download() {
  return (
    <ThemedView style={{ maxWidth: 320, width: "100%", padding: 8 }}>
      <ThemedText
        style={{ textAlign: "center", marginBottom: 20 }}
        type="subtitle"
      >
        Download
      </ThemedText>
      <ThemedView
        transparent
        style={{
          flexDirection: "row",
          maxWidth: 320,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <A href="https://google.com">
          <ThemedView transparent style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/images/ios.png")}
              style={{
                height: 50,
                width: 50,
                borderRadius: 100,
              }}
            />
            <ThemedText type="defaultSemiBold">IOS AppStore</ThemedText>
          </ThemedView>
        </A>
        <A href={playstoreURL} target="_blank">
          <ThemedView transparent style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/images/android.png")}
              style={{
                height: 50,
                width: 50,
                borderRadius: 100,
                shadowColor: "silver",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.8,
              }}
            />
            <ThemedText type="defaultSemiBold">Google Playstore</ThemedText>
          </ThemedView>
        </A>
      </ThemedView>
    </ThemedView>
  );
}
