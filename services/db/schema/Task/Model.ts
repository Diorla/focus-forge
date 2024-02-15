export type Priority = "high" | "medium" | "low" | "none";

interface TaskModel {
  id: string;
  title: string;
  checked: number;
  created: number;
  activityId: string;
}

export default TaskModel;
