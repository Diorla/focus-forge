import { useContext } from "react";
import activityContext from "./activityContext";
import Activity from "../../models/Activity";
import Schedule from "./Schedule";

export default function useActivity() {
  interface TaskContext {
    /**
     * All the activities of the user
     */
    activities: Activity[];
    /**
     * If there is an error
     */
    error: Error;
    /**
     * Still retrieving the activities
     */
    loading: boolean;

    time: {
      doneThisWeek: number;
      doneToday: number;
      thisWeekRemaining: number;
      todayRemaining: number;
      weeklyQuota: number;
      daysRemaining: number;
      todayQuota: number;
      leftover: number;
      todayTime: number;
      upcomingTime: number;
      todoTime: number;
      taskDone: number;
      taskLeft: number;
    };
    schedule: Schedule[];
    updateActivity: (
      activityId: string,
      value: Partial<Activity>
    ) => Promise<void>;
    deleteActivity: (id: string) => void;
  }

  return useContext<TaskContext>(activityContext);
}
