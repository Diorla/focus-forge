import { SQLTransactionErrorCallback, SQLiteDatabase } from "expo-sqlite";
import User from "../schema/User";
import UserModel from "../schema/User/Model";

export default function selectUser(
  db: SQLiteDatabase,
  callback?: (val: UserModel) => void,
  errorCallback?: SQLTransactionErrorCallback
) {
  db.transaction(
    (tx) =>
      tx.executeSql(`SELECT * FROM ${User.tableName} `, [], (tx, result) =>
        callback(result.rows._array[0])
      ),
    errorCallback
  );
}
