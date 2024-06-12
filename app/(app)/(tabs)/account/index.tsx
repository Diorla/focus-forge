import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import ListItem from "@/components/ListItem";
import useUser from "@/context/user/useUser";
import { Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import Confirm from "@/components/Confirm";
import signOut from "@/services/auth/signOut";

/**
 * Help centre
 * Privacy policy
 * Rate us
 * Reset data
 * @returns
 */
export default function TabTwoScreen() {
  const { user, updateUser } = useUser();

  const isLoggedIn = user.id !== "user";

  return (
    <ParallaxScrollView name="person">
      <ThemedView style={{ margin: 8 }}>
        {isLoggedIn && (
          <>
            <ListItem path="profile" title="Profile" name="person-circle" />
            <ListItem path="sync" title="Sync" name="sync" />
            <ListItem path="password" title="Change password" name="keypad" />
            <ListItem path="subscription" title="Subscription" name="star" />
          </>
        )}
        <ListItem path="stat" title="Stat" name="stats-chart" />
        <ListItem path="history" title="History" name="timer" />
        <ListItem path="settings" title="Settings" name="settings" />
        {isLoggedIn ? (
          <Confirm
            title="Log out"
            message="You will not be able to sync data while logged out"
            acceptFn={() => signOut().then(() => updateUser({ id: "user" }))}
          >
            <Pressable style={{ flexDirection: "row", paddingVertical: 8 }}>
              <ThemedText type="link" style={{ marginRight: 20 }}>
                <Ionicons size={28} name="log-out" />
              </ThemedText>
              <ThemedText type="link">Log out</ThemedText>
            </Pressable>
          </Confirm>
        ) : (
          <ListItem path="form" title="Login" name="log-in" />
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}
