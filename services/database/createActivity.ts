import { setDoc } from "firebase/firestore";
import { doc } from "./firestore";
import Activity from "../../models/Activity";

type Exclude = "createdAt" | "updatedAt";
export type CreateActivity = Omit<Activity, Exclude>;
export default async function createActivity(data: CreateActivity) {
  const formattedData: Activity = {
    ...data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  return setDoc(doc("activities", data.id), formattedData, { merge: true });
}
