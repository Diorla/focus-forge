import dayjs from "dayjs";

// time already done for today
export default function getDoneToday(
  doneList: string[],
  done: { [x: string]: number }
) {
  let doneToday = 0;
  const timeToday = doneList.filter((datetime) => dayjs(datetime).isToday());
  timeToday.forEach((date) => (doneToday += done[date]));
  return doneToday;
}
