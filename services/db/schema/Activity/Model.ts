export type Priority = "high" | "medium" | "low" | "none";

interface ActivityModel {
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
  timerStart: 0;
  timerLength: "";
  timerId: "";
  lastDone: number;
}

export default ActivityModel;
