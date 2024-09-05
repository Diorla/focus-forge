import { setDoc } from "firebase/firestore";
import { doc } from "../database/firestore";
import ActivityModel from "@/context/data/model/ActivityModel";

export type UpdateActivity = Partial<ActivityModel>;

export default async function updateActivity(
  data: UpdateActivity & { id: string },
  merge = true
) {
  const formattedData: UpdateActivity = {
    ...data,
    updatedAt: Date.now(),
  };
  return setDoc(doc("activityList", data.id), formattedData, { merge });
}
