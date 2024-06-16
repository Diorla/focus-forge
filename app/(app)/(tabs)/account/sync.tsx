import { Pressable, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { ThemedButton } from "@/components/ThemedButton";
import useUser from "@/context/user/useUser";
import sync from "@/services/storage/sync";
import { useToast } from "react-native-toast-notifications";
import { logError } from "@/services/database";
import updateUser from "@/services/database/updateUser";

export default function SyncScreen() {
  const { user } = useUser();
  const toast = useToast();
  return (
    <ParallaxScrollView name="server">
      <ThemedView
        style={{
          padding: 16,
          flex: 1,
          minHeight: 320,
          justifyContent: "space-evenly",
        }}
      >
        <ThemedText style={{ textAlign: "center" }}>
          This is where you import or sync your data
        </ThemedText>
        <ThemedView style={{ alignItems: "center" }}>
          <ThemedButton
            title="Sync"
            onPress={() =>
              sync(user.id)
                .then((value) => {
                  const { user } = value;
                  updateUser(user);
                  toast.show("Synced");
                })
                .catch((err) => logError(user.id, "syncing", err))
            }
            outlined
          />
        </ThemedView>
        <ThemedView style={{ alignItems: "center" }}>
          <ThemedButton title="Close" onPress={() => router.back()} />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}
