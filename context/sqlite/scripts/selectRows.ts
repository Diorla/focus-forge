import { SQLTransactionErrorCallback, SQLiteDatabase } from "expo-sqlite";

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
  db: SQLiteDatabase;
  table: string;
  model?: Model;
  col?: string[];
  callback?: (val: unknown[]) => void;
  errorCallback?: SQLTransactionErrorCallback;
}

export default function selectRows({
  db,
  table,
  model,
  col,
  callback,
  errorCallback,
}: SelectRowProp) {
  const { statement, values } = selectStatement(table, model || {}, col);

  db.transaction(
    (tx) =>
      tx.executeSql(statement, values, (_, result) =>
        callback(result.rows._array)
      ),
    errorCallback
  );
}
