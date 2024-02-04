import dayjs from "dayjs";

// time already for this week, excluding today
export default function getDoneThisWeek(
  doneList: string[],
  done: { [x: string]: number }
) {
  let doneThisWeek = 0;

  const timeThisWeek = doneList.filter(
    (datetime) => dayjs().isSame(datetime, "week") && !dayjs(datetime).isToday()
  );

  timeThisWeek.forEach((date) => (doneThisWeek += done[date]));
  return doneThisWeek;
}
