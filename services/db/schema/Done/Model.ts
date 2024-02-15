export type Priority = "high" | "medium" | "low" | "none";

interface DoneModel {
  id: string;
  datetime: number;
  comment: string;
  activityId: string;
  length: number;
}

export default DoneModel;
