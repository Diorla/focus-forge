import AsyncStorage from "@react-native-async-storage/async-storage";
import logError from "./logError";
import Activity from "../../models/Activity";

export default async function getActivity(): Promise<Activity[]> {
  try {
    const value = await AsyncStorage.getItem("@activity");
    if (value !== null) {
      return JSON.parse(value);
    }
    return [];
  } catch (e) {
    logError("getting activity", e);
  }
}
