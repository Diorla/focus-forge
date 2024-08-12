import ActivityModel from "./model/ActivityModel";
import DoneType from "./types/DoneType";
import dayjs from "dayjs";

// TODO: Remove function before production
// This is a temporary function to fix change in data types
export default function fixActivity(activity: ActivityModel) {
  const { done } = activity;
  const updatedDoneList: {
    [key: string]: DoneType;
  } = {};
  Object.keys(done).forEach((key) => {
    updatedDoneList[key] = {
      ...done[key],
      datetime: done[key].datetime || dayjs(key).valueOf(),
    };
  });
  activity.done = updatedDoneList;
  return activity;
}
