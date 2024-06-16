import { onSnapshot } from "firebase/firestore";
import logError from "./logError";
import { doc } from "./firestore";
import UserModel from "@/context/user/UserModel";

export default function watchUser(
  userId: string,
  callback: (data: UserModel) => void
) {
  const unsubscribe = onSnapshot(
    doc("users", userId),
    (doc) => {
      callback(doc.data() as UserModel);
    },
    (error) => {
      logError(userId, "user watcher", error);
    }
  );
  return unsubscribe;
}
