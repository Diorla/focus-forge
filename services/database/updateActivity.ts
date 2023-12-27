import { setDoc } from "firebase/firestore";
import { doc } from "../database/firestore";
import Activity from "../../models/Activity";

type Exclude = "updatedAt";
export type UpdateActivity = Omit<Activity, Exclude>;
export default async function updateActivity(data: UpdateActivity) {
  const formattedData: Activity = {
    ...data,
    updatedAt: Date.now(),
  };
  return setDoc(doc("activities", data.id), formattedData, { merge: true });
}
