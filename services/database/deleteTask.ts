import Activity from "../../models/Activity";

export default function deleteTask(activity: Activity, created: number) {
  const rest = activity.tasks.filter((item) => item.created !== created);

  const newActivity = {
    ...activity,
    tasks: rest,
  };

  return newActivity;
}
