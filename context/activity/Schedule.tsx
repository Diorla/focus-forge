import DoneModel from "../../services/db/schema/Done/Model";
import TaskModel from "../../services/db/schema/Task/Model";

export type Priority = "high" | "medium" | "low" | "none";

type Schedule = {
  id: string;
  name: string;
  weeklyTarget: number;
  dailyLimit: number;
  startDate: number;
  priority: Priority;
  description: string;
  color: string;
  category: string;
  archived: number;
  updatedAt: number;
  createdAt: number;
  done: DoneModel[];
  timer?: {
    startTime: number;
    length: number;
    notificationId: string;
  };
  tasks: TaskModel[];
  lastDone: number;
  doneToday: number;
  doneThisWeek: number;
  todayTime: number;
  upcomingTime: number;
  overflowTime: number;
};

export default Schedule;
