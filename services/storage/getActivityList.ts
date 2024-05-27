import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityModel from "../../context/data/model/ActivityModel";
import logError from "../database/logError";

export default async function getActivityList(): Promise<ActivityModel[]> {
  try {
    const value = await AsyncStorage.getItem("@activityList");
    if (value !== null) {
      return JSON.parse(value);
    } else return [];
  } catch (err) {
    logError("getActivityList", "getActivityList", err);
  }
}
