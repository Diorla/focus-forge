import { SQLStatementCallback, SQLTransactionErrorCallback } from "expo-sqlite";
import Database from "./Database";
import User from "./schema/User";

interface Model {
  [key: string]: string | number;
}

interface SelectRowProp {
  db: Database;
  table: string;
  model?: Model;
  col?: string[];
  callback?: SQLStatementCallback;
  errorCallback?: SQLTransactionErrorCallback;
}

export default function getUser({
  db,
  callback,
  errorCallback,
}: SelectRowProp) {
  db.transaction(
    (tx) =>
      tx.executeSql(
        `SELECT * FROM ${User.tableName} WHERE id = ?`,
        [User.tableName],
        callback
      ),
    errorCallback
  );
}
