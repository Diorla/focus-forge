import AsyncStorage from "@react-native-async-storage/async-storage";
import logError from "./logError";
import Activity from "../../models/Activity";
import getActivity from "./getActivity";

export default async function storeActivity(
  key: string,
  value: Activity
): Promise<Activity[]> {
  try {
    const data = await getActivity();
    const currentActivity = data.find((item) => item.id === value.id) || {};
    const activity = [
      ...data.filter((item) => item.id !== value.id),
      { ...currentActivity, ...value },
    ];
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return activity;
  } catch (e) {
    logError("storing activity", e);
  }
}
