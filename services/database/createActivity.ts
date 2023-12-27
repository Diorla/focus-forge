import { setDoc } from "firebase/firestore";
import { doc } from "../database/firestore";
import logError from "./logError";
import uuid from "react-native-uuid";
import Activity from "../../models/Activity";

type Exclude = "createdAt" | "updatedAt" | "id";
export type CreateActivity = Omit<Activity, Exclude>;
export default async function createActivity(data: CreateActivity) {
  const id = String(uuid.v4());
  const formattedData: Activity = {
    ...data,
    id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  try {
    setDoc(doc("activities", id), formattedData as Record<string, any>);
  } catch (error) {
    logError(data.userId, "creating new activity", error);
  }
}
