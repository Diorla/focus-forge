import { useContext } from "react";
import activityContext from "./activityContext";
import Activity from "../../models/Activity";

export default function useActivity() {
  interface TaskContext {
    /**
     * All the activitys of the user
     */
    activities: Activity[];
    /**
     * If there is an error
     */
    error: Error;
    /**
     * Still retrieving the activitys
     */
    loading: boolean;
  }

  return useContext<TaskContext>(activityContext);
}
