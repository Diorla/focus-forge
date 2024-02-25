import ActivityModel from "../../services/db/schema/Activity/Model";
import DoneModel from "../../services/db/schema/Done/Model";
import TaskModel from "../../services/db/schema/Task/Model";

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
