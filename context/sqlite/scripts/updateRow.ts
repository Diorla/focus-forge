import { SQLTransactionErrorCallback, SQLiteDatabase } from "expo-sqlite";
import isDefined from "./isDefined";
import selectRows from "./selectRows";

interface Data {
  id: string;
  [key: string]: string | number;
}

function updateRowStatement(table: string, data: Data) {
  const keys = Object.keys(data);

  const text = keys
    .filter((key) => (isDefined(data[key]) ? !["id"].includes(key) : false))
    .map(
      (key) =>
        `${key} = ${
          typeof data[key] === "string" ? "'" + data[key] + "'" : data[key]
        }`
    );
  return `UPDATE  ${table} SET ${text.join(", ")} WHERE id = ?;`;
}

export interface UpdateRowProps {
  db: SQLiteDatabase;
  table: string;
  data: Data;
  callback?: (val: unknown[]) => void;
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
    (tx) =>
      tx.executeSql(statement, [data.id], () => {
        selectRows({ db, table, callback, errorCallback });
      }),
    errorCallback
  );
}
