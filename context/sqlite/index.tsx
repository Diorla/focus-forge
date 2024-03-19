import { createContext, useContext, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { logError } from "../../services/database";

export type SQLiteContextType = {
  restartDB: () => void;
};

const SQLiteContext = createContext<SQLiteContextType>({
  restartDB: null,
});

export const useSQLiteQuery = () => {
  return useContext<SQLiteContextType>(SQLiteContext);
};

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
      db.closeSync();
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
