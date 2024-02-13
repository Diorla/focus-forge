import Activity from "../../models/Activity";

export default function deleteDoneTime(activity: Activity, datetime: string) {
  const { done, doneComment } = activity;
  delete done[datetime];
  delete doneComment[datetime];

  const newActivity = {
    ...activity,
    done,
    doneComment,
  };

  return newActivity;
}
