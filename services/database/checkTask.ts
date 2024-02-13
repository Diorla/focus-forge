import Activity from "../../models/Activity";

export default function checkTask(activity: Activity, created: number) {
  const task = activity.tasks.find((item) => item.created === created);
  const rest = activity.tasks.filter((item) => item.created !== created);
  rest.push({ ...task, checked: Date.now() });
  const newActivity = {
    ...activity,
    tasks: rest,
  };
  return newActivity;
}
