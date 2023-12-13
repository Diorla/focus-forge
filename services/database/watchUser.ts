import { onSnapshot } from "firebase/firestore";
import logError from "./logError";
import { doc } from "./firestore";
import User from "../../models/User";

export default function watchUser(
  userId: string,
  callback: (data: User) => void
) {
  const unsubscribe = onSnapshot(
    doc("users", userId),
    (doc) => {
      callback(doc.data() as User);
    },
    (error) => {
      logError(userId, "user watcher", error);
    }
  );
  return unsubscribe;
}
