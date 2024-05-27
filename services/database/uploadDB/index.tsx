import getActivityList from "../../storage/getActivityList";
import getUser from "../../storage/getUser";
import logError from "../logError";
import upload from "./upload";

// TODO: Enable login
/**
 * So, I need a way to uniquely identify a user which means they need to login
 * in order to be able to back up their data.
 * Right now, I'm just using "userID", which applies to anyone
 * @param userID
 */
export default async function uploadDB(userID: string) {
  try {
    const user = await getUser();
    const activityList = await getActivityList();
    const data = { activityList, user };
    const uri = JSON.stringify(data);
    upload({ uri, userID });
  } catch (error) {
    logError(userID, "upload db", error);
  }
}
