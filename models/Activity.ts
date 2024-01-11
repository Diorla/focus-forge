export type Priority = "high" | "medium" | "low" | "none";

export default interface Activity {
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
  userId: string;
  done: {
    [key: string]: number;
  };
  doneComment: {
    [key: string]: string;
  };
  timer?: {
    startTime: number;
  };
  tasks: { title: string; checked: number; created: number }[];
  lastDone: number;
}
