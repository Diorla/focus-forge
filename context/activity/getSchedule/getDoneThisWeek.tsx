import dayjs from "dayjs";
import DoneModel from "../../../services/db/schema/Done/Model";

// time already for this week, excluding today
export default function getDoneThisWeek(doneList: DoneModel[]) {
  let doneThisWeek = 0;

  const timeThisWeek = doneList.filter(
    (done) =>
      dayjs().isSame(done.dateTime, "week") && !dayjs(done.dateTime).isToday()
  );

  timeThisWeek.forEach((done) => (doneThisWeek += done.dateTime));
  return doneThisWeek;
}
