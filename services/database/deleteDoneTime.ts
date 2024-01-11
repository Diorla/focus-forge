import Activity from "../../models/Activity";
import updateActivity from "./updateActivity";

export default function deleteDoneTime(activity: Activity, datetime: string) {
  const { done, doneComment } = activity;
  delete done[datetime];
  delete doneComment[datetime];

  const newActivity = {
    ...activity,
    done,
    doneComment,
  };

  return updateActivity({ ...newActivity }, false);
}
