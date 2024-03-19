import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { logError } from "../../services/database";
import SQLiteContext from "./SQLiteContext";

export default function SQLiteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [db, setDb] = useState<SQLite.SQLiteDatabase>(null);
  useEffect(() => {
    const db = SQLite.openDatabase("db.db");
    setDb(db);

    return () => {
      if (db?.closeSync) db?.closeSync();
    };
  }, []);

  function restartDB() {
    try {
      db.closeAsync().then(() => {
        const db = SQLite.openDatabase("db.db");
        setDb(db);
      });
    } catch (error) {
      logError("", "restart DB", error);
    }
  }

  return (
    <SQLiteContext.Provider value={{ restartDB }}>
      {children}
    </SQLiteContext.Provider>
  );
}
