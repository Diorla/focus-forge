import { SQLStatementCallback, SQLTransactionErrorCallback } from "expo-sqlite";
import Database from "./Database";

interface Data {
  id: string;
  [key: string]: string | number;
}

function updateRowStatement(table: string, data: Data) {
  const keys = Object.keys(data).filter((item) => item !== "id");

  const text = keys
    .filter((key) => (data[key] ? key !== "activityId" : false))
    .map((key) => `${key} = ${data[key]}`);
  return `UPDATE  ${table} SET ${text.join(", ")} WHERE id = ?;`;
}

export interface UpdateRowProps {
  db: Database;
  table: string;
  data: Data;
  callback?: SQLStatementCallback;
  errorCallback?: SQLTransactionErrorCallback;
}

export default function updateRow({
  db,
  table,
  data,
  callback,
  errorCallback,
}: UpdateRowProps) {
  const statement = updateRowStatement(table, data);
  db.transaction(
    (tx) => tx.executeSql(statement, [data.id], callback),
    errorCallback
  );
}
