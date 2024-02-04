import Activity from "../../models/Activity";

type Schedule = Activity & {
  doneToday: number;
  doneThisWeek: number;
  thisWeekRemaining: number;
  todayQuota: number;
  futureTime: number;
  todayTime: number;
  additionalTime: number;
  upcomingTime: number;
  overflowTime: number;
};

export default Schedule;
