import uuid from "react-native-uuid";
import Activity from "../../models/Activity";

type Exclude = "createdAt" | "updatedAt" | "id";
export type CreateActivity = Omit<Activity, Exclude>;
export default function createActivity(data: CreateActivity) {
  const id = String(uuid.v4());
  const formattedData: Activity = {
    ...data,
    id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  return formattedData;
}
