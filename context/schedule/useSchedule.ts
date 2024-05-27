import { useContext } from "react";
import scheduleContext from "./scheduleContext";
import Schedule from "./Schedule";
import Checklist from "./Checklist";

export default function useSchedule() {
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
    checklist: Checklist[];
  }

  return useContext<TaskContext>(scheduleContext);
}
