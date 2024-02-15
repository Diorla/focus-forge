import { SQLStatementCallback, SQLTransactionErrorCallback } from "expo-sqlite";
import Database from "./Database";

interface Model {
  [key: string]: string | number;
}

function insertRowStatement(table: string, model: Model) {
  const keys = Object.keys(model);
  const values = keys.map((key) => model[key]);
  return {
    statement: `INSERT INTO ${table} (${keys.join(", ")}) values (${values
      .map(() => "?")
      .join(", ")})`,
    values,
  };
}

export interface InsertRowProps {
  db: Database;
  table: string;
  model: Model;
  callback?: SQLStatementCallback;
  errorCallback?: SQLTransactionErrorCallback;
}

export default function insertRow({
  db,
  table,
  model,
  callback,
  errorCallback,
}: InsertRowProps) {
  const { statement, values } = insertRowStatement(table, model);
  db.transaction(
    (tx) => tx.executeSql(statement, values, callback),
    errorCallback
  );
}
