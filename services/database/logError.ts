import { setDoc, Timestamp } from "firebase/firestore";
import uuid from "react-native-uuid";
import { doc } from "./firestore";
import { SQLError } from "expo-sqlite";

/**
 * It will be used to save errors to database
 * @param identifier This will be used to identify the user that generated the error
 * @param event the activity that generated the error
 * @param err the error that was generated
 */
export default function logError(
  identifier: string,
  event: string,
  err: Error | SQLError
) {
  try {
    if (__DEV__)
      console.log({
        identifier: identifier || "Anonymous",
        event: event || "Unidentified error",
        name: err?.name,
        message: err?.message,
        stack: err?.stack,
        time: Date.now(),
        err: err,
      });
    else
      setDoc(doc("errors", String(uuid.v4())), {
        err: JSON.stringify(err),
        identifier: identifier || "Anonymous",
        event: event || "Unidentified error",
        name: JSON.stringify(err?.name),
        message: JSON.stringify(err?.message),
        stack: JSON.stringify(err?.stack),
        time: Timestamp.now(),
      });
  } catch (error) {
    console.log(error);
    console.log("hopefully the developer caught this error");
  }
}
