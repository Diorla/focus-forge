import * as FileSystem from "expo-file-system";
import logError from "../logError";

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
    logError("db.db", "get uri", error);
  }
}
