/* eslint-disable no-console */
import { setDoc, Timestamp } from "firebase/firestore";
import uuid from "react-native-uuid";
import { doc } from "./firestore";

/**
 * It will be used to save errors to database
 * @param identifier will be used to identify the user that generated the error
 * @param event the activity that generated the error
 * @param err the error that was generated
 */
export default function logError(
  identifier: string,
  event: string,
  err: Error
) {
  const { name = "", stack = null } = { ...err };
  try {
    if (__DEV__)
      console.log({
        name,
        stack,
        identifier: identifier || "Anonymous",
        event: event || "Unidentified error",
        message: err?.message,
        time: Date.now(),
        err: err,
      });
    else
      setDoc(doc("errors", String(uuid.v4())), {
        name: JSON.stringify(name),
        stack: JSON.stringify(stack),
        err: JSON.stringify(err),
        identifier: identifier || "Anonymous",
        event: event || "Unidentified error",
        message: JSON.stringify(err?.message),
        time: Timestamp.now(),
      });
  } catch (error) {
    console.log(error);
    console.log("hopefully the developer caught this error");
  }
}
