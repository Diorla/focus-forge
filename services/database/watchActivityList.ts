import { query, onSnapshot } from "firebase/firestore";
import logError from "./logError";
import { collection, where } from "../database/firestore";
import ActivityModel from "@/context/data/model/ActivityModel";

export default function watchActivityList(
  userId: string,
  callback: (activityList: ActivityModel[]) => void
) {
  if (userId)
    try {
      const q = query(
        collection("activityList"),
        where("userId", "==", userId)
      );
      /*const q = query(
        collection("activityList"),
        where("userId", "==", userId),
        where("deletedAt", ">", 0)
      );*/
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const activityList: ActivityModel[] = [];
        querySnapshot.forEach((doc) => {
          activityList.push(doc.data() as ActivityModel);
        });
        callback(activityList);
      });
      return unsubscribe;
    } catch (error) {
      logError(userId, "error fetching activities", error as Error);
    }
}
