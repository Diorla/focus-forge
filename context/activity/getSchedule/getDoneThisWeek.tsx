import dayjs from "dayjs";
import DoneModel from "../../../services/db/schema/Done/Model";

// time already for this week, excluding today
export default function getDoneThisWeek(doneList: DoneModel[]) {
  let doneThisWeek = 0;

  const timeThisWeek = doneList.filter(
    (done) =>
      dayjs().isSame(done.datetime, "week") && !dayjs(done.datetime).isToday()
  );

  timeThisWeek.forEach((done) => (doneThisWeek += done.length));
  return doneThisWeek;
}
