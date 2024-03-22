import ActivityModel from "../sqlite/schema/Activity/Model";
import DoneModel from "../sqlite/schema/Done/Model";
import TaskModel from "../sqlite/schema/Task/Model";

export type Priority = "high" | "medium" | "low" | "none";

interface Schedule extends ActivityModel {
  done: DoneModel[];
  tasks: TaskModel[];
  doneToday: number;
  doneThisWeek: number;
  todayTime: number;
  upcomingTime: number;
  overflowTime: number;
}

export default Schedule;
