import { useContext } from "react";
import SQLiteContextType from "./SQLiteContextType";
import SQLiteContext from "./SQLiteContext";

export default function useSQLiteQuery() {
  return useContext<SQLiteContextType>(SQLiteContext);
}
