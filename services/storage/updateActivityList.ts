import AsyncStorage from "@react-native-async-storage/async-storage";
import { logError } from "../database";
import ActivityModel from "../../context/data/model/ActivityModel";
import getActivityList from "./getActivityList";
import { initialActivity } from "@/context/data/initialActivity";

export default async function updateActivityList(
  id: string,
  activity: Partial<ActivityModel>
): Promise<ActivityModel[]> {
  try {
    const activityList = await getActivityList();
    const value = activityList.find((x: ActivityModel) => x.id === id);
    const newActivity: ActivityModel = {
      ...initialActivity,
      ...value,
      ...activity,
      updatedAt: Date.now(),
    };

    const index = activityList.findIndex((x: ActivityModel) => x.id === id);
    const newActivityList: ActivityModel[] = [
      ...activityList.slice(0, index),
      ...activityList.slice(index + 1),
      newActivity,
    ];

    const data = JSON.stringify(newActivityList);
    await AsyncStorage.setItem("@activityList", data);
    return newActivityList;
  } catch (err) {
    logError(id, "updateActivity", err as Error);
    return [];
  }
}
