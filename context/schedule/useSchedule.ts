import { useContext } from "react";
import scheduleContext from "./scheduleContext";
import Schedule from "./Schedule";
import Checklist from "./Checklist";

export interface ScheduleContext {
  loading: boolean;
  time: {
    todoTime: number;
    taskDone: number;
    taskLeft: number;
    doneToday: number;
  };

  schedule: Schedule[];
  checklist: Checklist[];
}

export default function useSchedule() {
  return useContext<ScheduleContext>(scheduleContext);
}
