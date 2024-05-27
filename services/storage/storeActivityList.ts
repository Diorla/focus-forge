import AsyncStorage from "@react-native-async-storage/async-storage";
import { logError } from "../database";
import ActivityModel from "../../context/data/model/ActivityModel";

export default async function storeActivityList(
  value: ActivityModel[]
): Promise<ActivityModel[]> {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem("@activityList", data);
    return value;
  } catch (err) {
    logError("storeActivityList", "activityList", err);
  }
}
