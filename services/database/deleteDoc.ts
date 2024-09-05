import { deleteDoc as deleteDocument } from "firebase/firestore";
import { Collection, doc } from "../database/firestore";
import logError from "./logError";

export default async function deleteDoc(
  collectionName: Collection,
  documentName: string
) {
  try {
    const documentRef = doc(collectionName, documentName);
    await deleteDocument(documentRef);
  } catch (error) {
    logError(collectionName, "deleting document", error as Error);
  }
}
