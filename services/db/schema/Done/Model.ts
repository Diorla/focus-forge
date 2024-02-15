export type Priority = "high" | "medium" | "low" | "none";

interface DoneModel {
  id: string;
  dateTime: number;
  comment: string;
  activityId: string;
}

export default DoneModel;
