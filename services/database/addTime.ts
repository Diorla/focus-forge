import Activity from "../../models/Activity";
import { getDateTimeKey } from "../datetime";

export default function addTime(
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

  return newActivity;
}
