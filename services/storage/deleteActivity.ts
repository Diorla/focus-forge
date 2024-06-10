import AsyncStorage from "@react-native-async-storage/async-storage";
import { logError } from "../database";
import ActivityModel from "../../context/data/model/ActivityModel";
import getActivityList from "./getActivityList";

export default async function deleteActivity(
  id: string
): Promise<ActivityModel[]> {
  try {
    const activityList = await getActivityList();
    const index = activityList.findIndex((x: ActivityModel) => x.id === id);
    activityList.splice(index, 1);
    const data = JSON.stringify(activityList);
    await AsyncStorage.setItem("@activityList", data);
    return activityList;
  } catch (err) {
    logError(id, "deleteActivity", err as Error);
    return [];
  }
}
