import Activity from "../../models/Activity";
import updateActivity from "./updateActivity";

export default function updateDoneInfo(
  activity: Activity,
  prevDateTime: string,
  doneInfo: {
    comment: string;
    length: number;
    datetime: string;
  }
) {
  const { done, doneComment } = activity;
  const { comment = "", length = 0, datetime = 0 } = doneInfo;
  delete done[prevDateTime];
  delete doneComment[prevDateTime];

  const newActivity = {
    ...activity,
    done: {
      ...done,
      [datetime]: length,
    },
    doneComment: {
      ...doneComment,
      [datetime]: comment,
    },
  };

  return updateActivity({ ...newActivity }, false);
}
