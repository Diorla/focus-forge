import * as Notifications from "expo-notifications";

export function clearBadges() {
  Notifications.setBadgeCountAsync(0);
}
