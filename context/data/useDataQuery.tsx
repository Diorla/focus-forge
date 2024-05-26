import { useContext } from "react";
import DataContextType from "./DataContextType";
import DataContext from "./DataContext";

export default function useDataQuery() {
  return useContext<DataContextType>(DataContext);
}
