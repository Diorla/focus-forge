import { setDoc } from "firebase/firestore";
import { doc } from "../database/firestore";
import logError from "./logError";
import User from "../../models/User";

export type CreateUser = Partial<User> & { id: string };
export default async function createUser(data: CreateUser) {
  const formattedData = {
    ...data,
    updatedAt: Date.now(),
  };
  try {
    setDoc(doc("users", data.id), formattedData, { merge: true });
  } catch (error) {
    logError(data.email, "creating new user", error);
  }
}
