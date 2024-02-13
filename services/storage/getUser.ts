import AsyncStorage from "@react-native-async-storage/async-storage";
import logError from "./logError";
import User from "../../models/User";

export default async function getUser(): Promise<User | object> {
  try {
    const value = await AsyncStorage.getItem("@user");
    if (value !== null) {
      return JSON.parse(value);
    }
    return {};
  } catch (e) {
    logError("getting user", e);
  }
}
