import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";
import Database from "./Database";

export function openDatabase(): Database {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}
