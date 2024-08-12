import dayjs from "dayjs";
import ActivityModel from "../data/model/ActivityModel";
import Checklist from "./Checklist";

const minimumZero = (value: number): number => {
  return Math.max(0, value);
};

export default function getChecklist(
  activityList: ActivityModel[]
): Checklist[] {
  const checklist: Checklist[] = [];
  activityList.forEach((activity) => {
    const { occurrenceType, occurrence } = activity;
    if (occurrenceType === "daily") {
      const { done } = activity;
      const doneTimes = Object.keys(done).filter((doneItem) =>
        dayjs(done[doneItem].datetime).isToday()
      ).length;
      checklist.push({
        ...activity,
        remaining: minimumZero(occurrence - doneTimes),
        doneTimes,
      });
    } else if (occurrenceType === "weekly") {
      const { done } = activity;
      const doneTimes = Object.keys(done).filter((doneItem) =>
        dayjs().isSame(done[doneItem].datetime, "week")
      ).length;
      checklist.push({
        ...activity,
        remaining: minimumZero(occurrence - doneTimes),
        doneTimes,
      });
    } else if (occurrenceType === "monthly") {
      const { done } = activity;
      const doneTimes = Object.keys(done).filter((doneItem) =>
        dayjs().isSame(done[doneItem].datetime, "month")
      ).length;
      checklist.push({
        ...activity,
        remaining: minimumZero(occurrence - doneTimes),
        doneTimes,
      });
    } else {
      const { done } = activity;
      const doneTimes = Object.keys(done).filter((doneItem) =>
        dayjs().isSame(done[doneItem].datetime, "year")
      ).length;
      checklist.push({
        ...activity,
        remaining: minimumZero(occurrence - doneTimes),
        doneTimes,
      });
    }
  });
  return checklist;
}
