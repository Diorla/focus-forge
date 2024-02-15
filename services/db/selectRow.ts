import { SQLStatementCallback, SQLTransactionErrorCallback } from "expo-sqlite";
import Database from "./Database";

interface Model {
  [key: string]: string | number;
}

function selectStatement(table: string, model: Model, col?: string[]) {
  const keys = Object.keys(model);
  const values = keys.map((key) => model[key]);
  const where = keys.map((key) => `${key} = ?`).join(" and ");
  const select = col ? col.join(", ") : "*";
  let condition = "";
  if (where.length) condition = `WHERE ${where}`;
  return {
    statement: `SELECT ${select} FROM ${table} ${condition}`,
    values,
  };
}

interface SelectRowProp {
  db: Database;
  table: string;
  model?: Model;
  col?: string[];
  callback?: SQLStatementCallback;
  errorCallback?: SQLTransactionErrorCallback;
}

export default function selectRow({
  db,
  table,
  model,
  col,
  callback,
  errorCallback,
}: SelectRowProp) {
  const { statement, values } = selectStatement(table, model || {}, col);

  db.transaction(
    (tx) => tx.executeSql(statement, values, callback),
    errorCallback
  );
}
