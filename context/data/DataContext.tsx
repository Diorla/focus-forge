import { createContext } from "react";
import DataContextType from "./DataContextType";

export default createContext<DataContextType>({
  restartDB: () => null,
  activityList: [],
  createActivity: () => null,
  updateActivity: () => null,
  deleteActivity: () => null,
  time: Date.now(),
});
