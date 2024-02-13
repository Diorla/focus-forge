import AsyncStorage from "@react-native-async-storage/async-storage";
import logError from "./logError";
import User from "../../models/User";
import getUser from "./getUser";

export default async function storeUser(
  key: string,
  value: User
): Promise<User> {
  try {
    const data = await getUser();
    const user = { ...data, ...value };
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return user;
  } catch (e) {
    logError("storing user", e);
  }
}
