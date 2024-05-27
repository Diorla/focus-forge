import AsyncStorage from "@react-native-async-storage/async-storage";
import { logError } from "../database";
import ActivityModel from "../../context/data/model/ActivityModel";
import getActivityList from "./getActivityList";

export default async function updateActivityList(
  id: string,
  activity: Partial<ActivityModel>
): Promise<ActivityModel[]> {
  try {
    const activityList = await getActivityList();
    const value = activityList.find((x: ActivityModel) => x.id === id);
    Object.assign(value, activity);
    const index = activityList.findIndex((x: ActivityModel) => x.id === id);
    activityList.splice(index, 1, value);
    const data = JSON.stringify(activityList);
    await AsyncStorage.setItem("@activityList", data);
    return activityList;
  } catch (err) {
    logError(id, "updateActivity", err);
  }
}
