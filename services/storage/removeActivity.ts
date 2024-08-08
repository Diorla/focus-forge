import ActivityModel from "@/context/data/model/ActivityModel";
import { logError } from "../database";
import updateActivityList from "./updateActivityList";

// The reason why I am using deletedAt instead of just deleting the file is
// because of synching with the web. If I merge two data/json, the deleted
// object will reappear in the app.
// So now, I could just filter out deletedAt that is not 0

export default async function deleteActivity(
  id: string
): Promise<ActivityModel[]> {
  try {
    const activityList = await updateActivityList(id, {
      deletedAt: Date.now(),
    });
    return activityList;
  } catch (err) {
    logError(id, "deleteActivity", err as Error);
    return [];
  }
}
