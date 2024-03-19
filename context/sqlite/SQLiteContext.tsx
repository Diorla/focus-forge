import { createContext } from "react";
import SQLiteContextType from "./SQLiteContextType";

export default createContext<SQLiteContextType>({
  restartDB: null,
});
