import ActivityModel from "../data/model/ActivityModel";

interface Schedule extends ActivityModel {
  doneToday: number;
  doneThisWeek: number;
  todayTime: number;
  upcomingTime: number;
  overflowTime: number;
}

export default Schedule;
