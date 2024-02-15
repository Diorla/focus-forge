export type Priority = "high" | "medium" | "low" | "none";

interface TaskModel {
  title: string;
  checked: number;
  created: number;
  activityId: string;
}

export default TaskModel;
