import Activity from "../../models/Activity";
import updateActivity from "./updateActivity";

export default function uncheckTask(activity: Activity, created: number) {
  const task = activity.tasks.find((item) => item.created === created);
  const rest = activity.tasks.filter((item) => item.created !== created);
  rest.push({ ...task, checked: 0 });
  const newActivity = {
    ...activity,
    tasks: rest,
  };
  return updateActivity({ ...newActivity });
}
