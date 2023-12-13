import {
  collection as col,
  getFirestore,
  doc as firebaseDoc,
  WhereFilterOp,
  QueryFieldFilterConstraint,
  where as whereFilter,
} from "firebase/firestore";
import app from "../../constants/firebaseConfig";

const db = getFirestore(app);

export type Collection = "users" | "tasks" | "errors";

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

export const doc = (collectionName: Collection, ...pathSegments: string[]) => {
  return firebaseDoc(db, collectionName, ...pathSegments);
};
