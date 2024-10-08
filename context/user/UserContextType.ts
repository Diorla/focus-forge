import UserModel from "./UserModel";
import * as Notifications from "expo-notifications";
import { ColorType } from "@/constants/Colors";

export interface UserContextType {
  user: UserModel;
  loading: boolean;
  notification: Notifications.Notification | undefined;
  expoPushToken: string;
  theme: ColorType;
}
