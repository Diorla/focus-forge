import AsyncStorage from "@react-native-async-storage/async-storage";
import { logError } from "../database";
import ActivityModel from "../../context/data/model/ActivityModel";
import getActivityList from "./getActivityList";

export default async function saveActivity(
  value: ActivityModel
): Promise<ActivityModel[]> {
  try {
    const activityList = await getActivityList();
    activityList.push(value);
    const data = JSON.stringify(activityList);
    await AsyncStorage.setItem("@activityList", data);
    return activityList;
  } catch (err) {
    logError(value.id, "saveActivity", err);
  }
}
