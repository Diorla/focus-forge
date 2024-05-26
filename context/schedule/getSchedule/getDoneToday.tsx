import dayjs from "dayjs";
import DoneType from "../../data/types/DoneType";

// time already done for today
export default function getDoneToday(doneList: DoneType[]) {
  let doneToday = 0;
  const timeToday = doneList.filter((done) => dayjs(done.datetime).isToday());
  timeToday?.forEach((done) => (doneToday += done.length));
  return doneToday;
}
