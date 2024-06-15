import getUser from "@/services/storage/getUser";
import upload from "./upload";
import getActivityList from "@/services/storage/getActivityList";
import logError from "../logError";

// TODO: Enable login
/**
 * So, I need a way to uniquely identify a user which means they need to login
 * in order to be able to back up their data.
 * Right now, I'm just using "userId", which applies to anyone
 * @param userId
 */
export default async function uploadDB(userId: string) {
  try {
    const user = await getUser();
    const activityList = await getActivityList();
    const data = { activityList, user };
    const uri = JSON.stringify(data);
    upload({ uri, userId });
  } catch (error) {
    logError(userId, "upload db", error as Error);
  }
}
