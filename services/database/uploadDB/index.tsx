import logError from "../logError";
import loadFile from "./loadFile";
import upload from "./upload";

// TODO: Enable login
/**
 * So, I need a way to uniquely identify a user which means they need to login
 * in order to be able to back up their data.
 * Right now, I'm just using "userID", which applies to anyone
 * @param userID
 */
export default function uploadDB(userID: string) {
  try {
    loadFile().then((uri) => upload({ uri, userID }));
  } catch (error) {
    logError(userID, "upload db", error);
  }
}
