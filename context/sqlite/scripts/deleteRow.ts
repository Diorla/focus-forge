import { SQLTransactionErrorCallback, SQLiteDatabase } from "expo-sqlite";

export interface DeleteRowProps {
  db: SQLiteDatabase;
  table: string;
  id: string;
  callback?: (val: unknown[]) => void;
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
    (tx) =>
      tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, results) =>
        callback(results.rows._array)
      ),
    errorCallback
  );
}
