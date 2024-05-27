import AsyncStorage from "@react-native-async-storage/async-storage";
import { logError } from "../database";
import UserModel from "../../context/data/model/UserModel";

export default async function storeUser(value: UserModel): Promise<UserModel> {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem("@user", data);
    return value;
  } catch (err) {
    logError(value.id, "storeUser", err);
  }
}
