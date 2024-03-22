import { SQLTransactionErrorCallback, SQLiteDatabase } from "expo-sqlite";
import selectRows from "./selectRows";

interface Data {
  [key: string]: string | number;
}

function insertRowStatement(table: string, data: Data) {
  const keys = Object.keys(data);
  const values = keys.map((key) => data[key]);
  return {
    statement: `INSERT INTO ${table} (${keys.join(", ")}) values (${values
      .map(() => "?")
      .join(", ")})`,
    values,
  };
}

export interface InsertRowProps {
  db: SQLiteDatabase;
  table: string;
  data: Data;
  callback?: (val: unknown[]) => void;
  errorCallback?: SQLTransactionErrorCallback;
}

export default function insertRow({
  db,
  table,
  data,
  callback,
  errorCallback,
}: InsertRowProps) {
  const { statement, values } = insertRowStatement(table, data);
  db.transaction(
    (tx) =>
      tx.executeSql(statement, values, () =>
        selectRows({ db, table, callback, errorCallback })
      ),
    errorCallback
  );
}
