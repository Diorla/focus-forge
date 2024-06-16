import app from "@/constants/firebaseConfig";
import {
  collection as col,
  getFirestore,
  doc as firebaseDoc,
  WhereFilterOp,
  QueryFieldFilterConstraint,
  where as whereFilter,
} from "firebase/firestore";

const db = getFirestore(app);

export const collection = (collectionName: Collection) => {
  return col(db, collectionName);
};

export function where(
  fieldPath: string,
  opStr: WhereFilterOp,
  value: string | number | boolean | null | string[]
): QueryFieldFilterConstraint {
  return whereFilter(fieldPath, opStr, value);
}

export type Collection = "errors" | "users" | "activityList";

export const doc = (collectionName: Collection, ...pathSegments: string[]) => {
  return firebaseDoc(db, collectionName, ...pathSegments);
};
