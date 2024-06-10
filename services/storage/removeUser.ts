import AsyncStorage from "@react-native-async-storage/async-storage";
import { logError } from "../database";
import getUser from "./getUser";
import UserModel from "../../context/data/model/UserModel";
import { initialUser } from "@/context/user/initialUser";

export default async function removeUser(): Promise<UserModel> {
  try {
    await AsyncStorage.removeItem("@user");
    const newValue = await getUser();
    return newValue;
  } catch (err) {
    logError("removeUser", "removeUser", err as Error);
    return initialUser;
  }
}
