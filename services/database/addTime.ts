import Activity from "../../models/Activity";
import { getDateTimeKey } from "../datetime";
import updateActivity from "./updateActivity";

export default function updateDoneInfo(
  activity: Activity,
  doneInfo: {
    comment: string;
    length: number;
    datetime: number;
  }
) {
  const { done, doneComment } = activity;
  const { comment = "", length = 0, datetime = 0 } = doneInfo;

  const datetimeKey = getDateTimeKey(datetime);

  const newActivity = {
    ...activity,
    done: {
      ...done,
      [datetimeKey]: length,
    },
    doneComment: {
      ...doneComment,
      [datetimeKey]: comment,
    },
  };

  return updateActivity({ ...newActivity }, false);
}
