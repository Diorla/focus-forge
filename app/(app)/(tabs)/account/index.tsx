import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import ListItem from "@/components/ListItem";

/**
 * Help centre
 * Privacy policy
 * Rate us
 * Reset data
 * @returns
 */
export default function TabTwoScreen() {
  return (
    <ParallaxScrollView name="person">
      <ThemedView>
        <ListItem path="profile" title="Profile" name="person-circle" />
        <ListItem path="sync" title="Sync" name="sync" />
        <ListItem path="stat" title="Stat" name="stats-chart" />
        <ListItem path="history" title="History" name="timer" />
        <ListItem path="password" title="Change password" name="keypad" />
        <ListItem path="settings" title="Settings" name="settings" />
        <ListItem path="subscription" title="Subscription" name="star" />
        <ListItem path="form" title="Login" name="log-in" />
      </ThemedView>
    </ParallaxScrollView>
  );
}
