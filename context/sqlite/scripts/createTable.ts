import { SQLiteDatabase } from "expo-sqlite";
import { ModelMap } from "../../../services/db";
import { logError } from "../../../services/database";

function createStatement(table: string, model: ModelMap) {
  const keys = Object.keys(model);
  const str = keys.map((key) => {
    const {
      type,
      primaryKey,
      allowNull = true,
      defaultValue,
      autoIncrement,
    } = model[key];
    return [
      key,
      type,
      primaryKey ? "PRIMARY KEY " : "",
      allowNull ? "" : "NOT NULL",
      defaultValue === undefined ? "" : `DEFAULT ${defaultValue}`,
      autoIncrement ? "AUTOINCREMENT" : "",
    ]
      .map((item) => item.trim())
      .filter((item) => item)
      .join(" ")
      .trim();
  });

  return `CREATE TABLE IF NOT EXISTS ${table} (${str.join(", ")})`;
}

export default function createTable(
  db: SQLiteDatabase,
  table: string,
  model: ModelMap
) {
  const statement = createStatement(table, model);
  db.transaction(
    (tx) => tx.executeSql(statement),
    (error) => logError(table, "create table", error)
  );
}
