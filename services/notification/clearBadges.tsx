import * as Notifications from "expo-notifications";

export default function clearBadges() {
  Notifications.setBadgeCountAsync(0);
}
