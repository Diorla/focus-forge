import AsyncStorage from "@react-native-async-storage/async-storage";
import { logError } from "../database";
import UserModel from "../../context/data/model/UserModel";
import getUser from "./getUser";
import { initialUser } from "@/context/user/initialUser";

export default async function saveUser(
  value: Partial<UserModel>
): Promise<UserModel> {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.mergeItem("@user", data);
    const newValue = await getUser();
    return newValue;
  } catch (err) {
    logError(value.id || "", "saveUser", err as Error);
    return initialUser;
  }
}
