import { setDoc } from "firebase/firestore";
import { doc } from "../database/firestore";
import logError from "./logError";
import UserModel from "@/context/user/UserModel";

export type UpdateUser = Partial<UserModel> & { id: string };
export default async function updateUser(data: UpdateUser) {
  const formattedData = {
    ...data,
    updatedAt: Date.now(),
  };
  try {
    setDoc(doc("users", data.id), formattedData, { merge: true });
  } catch (error) {
    logError(data?.email || data.id, "creating new user", error as Error);
  }
}
