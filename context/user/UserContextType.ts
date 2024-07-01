import UserModel from "./UserModel";
import * as Notifications from "expo-notifications";

export interface UserContextType {
  user: UserModel;
  loading: boolean;
  notification: Notifications.Notification | undefined;
  expoPushToken: string;
}
