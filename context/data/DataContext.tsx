import { createContext } from "react";
import DataContextType from "./DataContextType";

export default createContext<DataContextType>({
  activityList: [],
  time: Date.now(),
});
