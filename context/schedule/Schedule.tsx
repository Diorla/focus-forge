import ActivityModel from "../data/model/ActivityModel";

export type Priority = "high" | "medium" | "low" | "none";

interface Schedule extends ActivityModel {
  doneToday: number;
  doneThisWeek: number;
  todayTime: number;
  upcomingTime: number;
  overflowTime: number;
}

export default Schedule;
