import { useContext } from "react";
import activityContext from "./activityContext";
import Schedule from "./Schedule";

export default function useActivity() {
  interface TaskContext {
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
  }

  return useContext<TaskContext>(activityContext);
}
