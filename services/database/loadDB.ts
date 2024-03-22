import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as FileSystem from "expo-file-system";
import logError from "./logError";

const storage = getStorage();

export default async function loadDB() {
  try {
    return getDownloadURL(ref(storage, "user/userID/db.db")).then(
      async (url) => {
        await FileSystem.downloadAsync(
          url,
          FileSystem.documentDirectory + "SQLite/db.db"
        );
      }
    );
  } catch (error) {
    logError("userID", "loadDB", error);
  }
}
