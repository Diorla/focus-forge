import { useContext } from "react";
import scheduleContext from "./scheduleContext";
import Schedule from "./Schedule";
import Checklist from "./Checklist";

export interface ScheduleContext {
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

export default function useSchedule() {
  return useContext<ScheduleContext>(scheduleContext);
}
