import AsyncStorage from "@react-native-async-storage/async-storage";
import UserModel from "../../context/user/UserModel";
import storeUser from "./storeUser";
import logError from "../database/logError";
import { initialUser } from "@/context/user/initialUser";

export default async function getUser(): Promise<UserModel> {
  const defaultUser: UserModel = {
    name: "",
    id: "",
    weeklyQuota: 0,
    dailyQuota: [0, 0, 0, 0, 0, 0, 0],
    useWeeklyQuota: true,
    updatedAt: Date.now(),
    startTime: 0,
    createdAt: Date.now(),
  };
  try {
    const value = await AsyncStorage.getItem("@user");
    if (value !== null) {
      return JSON.parse(value);
    } else {
      storeUser(defaultUser);
      return defaultUser;
    }
  } catch (err) {
    logError("getUser", "getUser", err as Error);
    return initialUser;
  }
}
