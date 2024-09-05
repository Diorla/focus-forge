import { initialActivity } from "@/context/data/initialActivity";
import ActivityModel from "../../context/data/model/ActivityModel";
import { logError } from "../database";
import getActivityList from "./getActivityList";

export default async function getActivity(id: string): Promise<ActivityModel> {
  try {
    const value = await getActivityList();
    return value.filter((item: ActivityModel) => item.id === id)[0];
  } catch (err) {
    logError(id, "getActivity", err as Error);
    return initialActivity;
  }
}
