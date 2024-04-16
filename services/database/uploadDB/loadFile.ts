import * as FileSystem from "expo-file-system";
import logError from "../logError";
import dbInfo from "../../../constants/db";

const dbPath = dbInfo.db;

export default async function loadFile() {
  try {
    const { exists } = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + "SQLite/db.db"
    );
    if (exists) {
      const file = await FileSystem.getContentUriAsync(
        FileSystem.documentDirectory + "SQLite/db.db"
      );
      return file;
    }
    return null;
  } catch (error) {
    logError(dbPath, "get uri", error);
  }
}
