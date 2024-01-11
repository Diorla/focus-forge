import { setDoc } from "firebase/firestore";
import { doc } from "../database/firestore";
import Activity from "../../models/Activity";

export type UpdateActivity = Partial<Activity>;

export default async function updateActivity(
  data: UpdateActivity & { id: string },
  merge = true
) {
  const formattedData: UpdateActivity = {
    ...data,
    updatedAt: Date.now(),
  };
  return setDoc(doc("activities", data.id), formattedData, { merge });
}
