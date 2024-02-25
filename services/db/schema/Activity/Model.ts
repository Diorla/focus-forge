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
  timerStart: number;
  timerLength: number;
  timerId: string;
  lastDone: number;
}

export default ActivityModel;
