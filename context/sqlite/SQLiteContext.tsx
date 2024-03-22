import { createContext } from "react";
import SQLiteContextType from "./types/SQLiteContextType";

export default createContext<SQLiteContextType>({
  restartDB: null,
  isReady: false,
  user: null,
  activityList: [],
  taskList: [],
  doneList: [],
  createUser: null,
  updateUser: null,
  deleteUser: null,
  createActivity: null,
  updateActivity: null,
  deleteActivity: null,
  updateDone: null,
  createDone: null,
  deleteDone: null,
  updateTask: null,
  createTask: null,
  deleteTask: null,
});
