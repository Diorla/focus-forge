import dayjs from "dayjs";
import DoneModel from "../../../services/db/schema/Done/Model";

// time already done for today
export default function getDoneToday(doneList: DoneModel[]) {
  let doneToday = 0;
  const timeToday = doneList.filter((done) => dayjs(done.datetime).isToday());
  timeToday.forEach((done) => (doneToday += done.length));
  return doneToday;
}
