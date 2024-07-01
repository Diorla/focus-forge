import { Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import goBack from "@/services/routing";
import useUser from "@/context/user/useUser";
import { ThemedButton } from "@/components/ThemedButton";
import { schedulePushNotification } from "@/services/notification";

const message = {
  sound: "default",
  title: "Original Titre",
  body: "And here is the very body!",
  data: { someData: "goes here, doesn't it" },
};

export default function TabTwoScreen() {
  const { notification, expoPushToken } = useUser();
  return (
    <ParallaxScrollView name="key">
      <ThemedView>
        <ThemedText>This is where you can change password</ThemedText>
        <ThemedText>expoPushToken: {expoPushToken}</ThemedText>
        <ThemedText>
          Title: {notification && notification.request.content.title}{" "}
        </ThemedText>
        <ThemedText>
          Body: {notification && notification.request.content.body}
        </ThemedText>
        <ThemedText>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </ThemedText>
      </ThemedView>
      <ThemedButton
        title="Send notification"
        onPress={async () => schedulePushNotification(message, 10)}
      />
      <Pressable onPress={() => goBack()}>
        <ThemedText type="link">Close</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}
