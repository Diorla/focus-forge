import { SQLStatementCallback, SQLTransactionErrorCallback } from "expo-sqlite";
import Database from "./Database";

export interface DeleteRowProps {
  db: Database;
  table: string;
  id: string;
  callback?: SQLStatementCallback;
  errorCallback?: SQLTransactionErrorCallback;
}

export default function deleteRow({
  db,
  table,
  id,
  callback,
  errorCallback,
}: DeleteRowProps) {
  db.transaction(
    (tx) => tx.executeSql(`delete from ${table} where id = ?;`, [id], callback),
    errorCallback
  );
}
