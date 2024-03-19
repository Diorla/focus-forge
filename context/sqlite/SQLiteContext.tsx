import { createContext } from "react";
import SQLiteContextType from "./types/SQLiteContextType";

export default createContext<SQLiteContextType>({
  restartDB: null,
  isReady: false,
  user: null,
  activity: [],
  task: [],
  done: [],
  createUser: null,
  updateUser: null,
  deleteUser: null,
});
