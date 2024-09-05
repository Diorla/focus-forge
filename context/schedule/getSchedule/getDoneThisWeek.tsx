import dayjs from "dayjs";
import DoneType from "../../data/types/DoneType";

// time already for this week, excluding today
export default function getDoneThisWeek(doneList: DoneType[]) {
  let doneThisWeek = 0;

  const timeThisWeek = doneList.filter(
    (done) =>
      dayjs().isSame(done.datetime, "week") && !dayjs(done.datetime).isToday()
  );

  timeThisWeek?.forEach((done) => (doneThisWeek += done.length));
  return doneThisWeek;
}
