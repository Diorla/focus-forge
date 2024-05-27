import dayjs from "dayjs";
import ActivityModel from "../data/model/ActivityModel";
import Checklist from "./Checklist";

export default function getChecklist(
  activityList: ActivityModel[]
): Checklist[] {
  const checklist: Checklist[] = [];
  activityList.forEach((activity) => {
    const { occurrenceType, occurrence } = activity;
    if (occurrenceType === "daily") {
      const { done } = activity;
      const doneTimes = Object.keys(done).filter((date) =>
        dayjs(date).isToday()
      ).length;
      checklist.push({
        ...activity,
        remaining: occurrence - doneTimes,
      });
    } else if (occurrenceType === "weekly") {
      const { done } = activity;
      const doneTimes = Object.keys(done).filter((date) =>
        dayjs().isSame(date, "week")
      ).length;
      checklist.push({
        ...activity,
        remaining: occurrence - doneTimes,
      });
    } else if (occurrenceType === "monthly") {
      const { done } = activity;
      const doneTimes = Object.keys(done).filter((date) =>
        dayjs().isSame(date, "month")
      ).length;
      checklist.push({
        ...activity,
        remaining: occurrence - doneTimes,
      });
    } else {
      const { done } = activity;
      const doneTimes = Object.keys(done).filter((date) =>
        dayjs().isSame(date, "year")
      ).length;
      checklist.push({
        ...activity,
        remaining: occurrence - doneTimes,
      });
    }
  });
  return checklist;
}
