import Activity from "../../models/Activity";

export default function createTask(activity: Activity, title: string) {
  const newActivity = {
    ...activity,
    tasks: [...activity.tasks, { title, created: Date.now(), checked: 0 }],
  };
  return newActivity;
}
