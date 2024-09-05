import { createContext } from "react";
import { ScheduleContext } from "./useSchedule";

const scheduleContext = createContext<ScheduleContext>({
  loading: true,
  time: {
    todoTime: 0,
    taskDone: 0,
    taskLeft: 0,
    doneToday: 0,
  },
  schedule: [],
  checklist: [],
});

export default scheduleContext;
