import { query, onSnapshot } from "firebase/firestore";
import logError from "./logError";
import { collection, where } from "../database/firestore";
import Activity from "../../models/Activity";

export default function watchActivities(
  userId: string,
  callback: (activities: Activity[]) => void
) {
  if (userId)
    try {
      const q = query(collection("activities"), where("userId", "==", userId));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const activities = [];
        querySnapshot.forEach((doc) => {
          activities.push(doc.data());
        });
        callback(activities);
      });
      return unsubscribe;
    } catch (error) {
      logError(userId, "error fetching activities", error);
    }
}
