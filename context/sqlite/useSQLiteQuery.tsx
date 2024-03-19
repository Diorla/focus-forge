import { useContext } from "react";
import SQLiteContextType from "./types/SQLiteContextType";
import SQLiteContext from "./SQLiteContext";

export default function useSQLiteQuery() {
  return useContext<SQLiteContextType>(SQLiteContext);
}
