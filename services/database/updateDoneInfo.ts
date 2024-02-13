import Activity from "../../models/Activity";

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
  const { comment = "", length = 0, datetime = "" } = doneInfo;
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

  return newActivity;
}
