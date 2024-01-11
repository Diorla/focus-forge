import Activity from "../../models/Activity";
import updateActivity from "./updateActivity";

export default function deleteTask(activity: Activity, created: number) {
  const rest = activity.tasks.filter((item) => item.created !== created);

  const newActivity = {
    ...activity,
    tasks: rest,
  };

  return updateActivity({ ...newActivity });
}
