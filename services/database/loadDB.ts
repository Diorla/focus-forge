import { getStorage, ref, getDownloadURL } from "firebase/storage";
import logError from "./logError";

const storage = getStorage();

export default async function loadDB(userId: string): Promise<string> {
  try {
    const url = await getDownloadURL(ref(storage, `user/${userId}/db.txt`));
    const response = await fetch(url);
    const text = await response.text();
    return text;
  } catch (error) {
    logError("userID", "loadDB", error as Error);
    return "";
  }
}
