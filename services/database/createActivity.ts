import { setDoc } from "firebase/firestore";
import { doc } from "../database/firestore";
import logError from "./logError";
import uuid from "react-native-uuid";
import ActivityModel from "@/context/data/model/ActivityModel";

type Exclude = "createdAt" | "updatedAt" | "id";
export type CreateActivity = Omit<ActivityModel, Exclude>;

export default async function createActivity(data: CreateActivity) {
  const id = String(uuid.v4());
  const formattedData: ActivityModel = {
    ...data,
    id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  try {
    setDoc(doc("activityList", id), formattedData as Record<string, any>);
  } catch (error) {
    logError(data.userId, "creating new activity", error as Error);
  }
}
