import { createContext } from "react";
import { ScheduleContext } from "./useSchedule";

const scheduleContext = createContext<ScheduleContext>({
  loading: true,
  time: {
    doneThisWeek: 0,
    doneToday: 0,
    thisWeekRemaining: 0,
    todayRemaining: 0,
    weeklyQuota: 0,
    daysRemaining: 0,
    todayQuota: 0,
    leftover: 0,
    todayTime: 0,
    upcomingTime: 0,
    todoTime: 0,
    taskDone: 0,
    taskLeft: 0,
  },
  schedule: [],
  checklist: [],
});

export default scheduleContext;
