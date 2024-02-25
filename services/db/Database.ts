import { SQLiteDatabase } from "expo-sqlite";

type Database =
  | SQLiteDatabase
  | {
      transaction: () => {
        executeSql: () => void;
      };
    };

export default Database;
