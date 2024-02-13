/* eslint-disable no-console */
import { setDoc, Timestamp } from "firebase/firestore";
import uuid from "react-native-uuid";
import { doc } from "../database";
import Constants from "expo-constants";
import { Platform } from "react-native";

/**
 * It will be used to save errors to database
 * @param identifier This will be used to identify the user that generated the error
 * @param event the activity that generated the error
 * @param err the error that was generated
 */
export default function logError(event: string, err: Error) {
  try {
    const obj = {
      event: event || "Unidentified error",
      err: JSON.stringify(err),
      deviceName: Constants.deviceName,
      name: JSON.stringify(err?.name),
      message: JSON.stringify(err?.message),
      stack: JSON.stringify(err?.stack),
      time: Timestamp.now(),
      version: Constants.expoConfig.version,
      buildNumber: Constants.platform.ios?.buildNumber,
      platform: Platform.OS,
    };

    if (__DEV__) console.log(obj);
    else setDoc(doc("errors", String(uuid.v4())), obj);
  } catch (error) {
    console.log(error);
    console.log("hopefully the developer caught this error");
  }
}
