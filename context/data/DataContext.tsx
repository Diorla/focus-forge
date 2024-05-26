import { createContext } from "react";
import DataContextType from "./DataContextType";

export default createContext<DataContextType>({
  restartDB: null,
  isReady: false,
  user: null,
  activityList: [],
  createUser: null,
  updateUser: null,
  deleteUser: null,
  createActivity: null,
  updateActivity: null,
  deleteActivity: null,
});
