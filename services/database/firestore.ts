import { getFirestore, doc as firebaseDoc } from "firebase/firestore";
import app from "../../constants/firebaseConfig";

const db = getFirestore(app);

export type Collection = "errors";

export const doc = (collectionName: Collection, ...pathSegments: string[]) => {
  return firebaseDoc(db, collectionName, ...pathSegments);
};
