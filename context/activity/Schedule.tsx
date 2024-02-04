import Activity from "../../models/Activity";

type Schedule = Activity & {
  doneToday: number;
  doneThisWeek: number;
  todayTime: number;
  upcomingTime: number;
  overflowTime: number;
};

export default Schedule;
