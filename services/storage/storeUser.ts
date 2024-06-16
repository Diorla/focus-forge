import AsyncStorage from "@react-native-async-storage/async-storage";
import UserModel from "../../context/user/UserModel";
import logError from "../database/logError";
import { initialUser } from "@/context/user/initialUser";

export default async function storeUser(value: UserModel): Promise<UserModel> {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem("@user", data);
    return value;
  } catch (err) {
    logError(value.id, "storeUser", err as Error);
    return initialUser;
  }
}
