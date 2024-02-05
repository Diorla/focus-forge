import dayjs, { Dayjs } from "dayjs";
import getDDMMYY from "./getDDMMYY";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function relativeWeek(target: Dayjs) {
  if (dayjs().isSame(target, "week")) return "This week";
  if (dayjs().diff(target, "week") === 1) return "Last week";
  if (dayjs().diff(target, "week") === -1) return "Next week";
  const [startDate, startMonth, startYear] = getDDMMYY(dayjs(target).day(0));
  const [targetDate, targetMonth, targetYear] = getDDMMYY(dayjs(target).day(6));
  const [, thisMonth, thisYear] = getDDMMYY(dayjs());

  if (dayjs().valueOf() < dayjs(target).valueOf()) {
    if (thisYear === targetYear) {
      if (thisMonth === targetMonth) return `${targetDate} to ${startDate}`;
      return `${targetDate}/${months[targetMonth]} to  ${startDate}/${months[startMonth]}`;
    }
    return `${targetDate}/${months[targetMonth]}/${targetYear} to  ${startDate}/${months[startMonth]}/${startYear}`;
  }

  if (thisYear === targetYear) {
    if (thisMonth === targetMonth) return `${startDate} to ${targetDate}`;
    return `${startDate}/${months[startMonth]} to ${targetDate}/${months[targetMonth]}`;
  }
  return `${startDate}/${months[startMonth]}/${startYear} to ${targetDate}/${months[targetMonth]}/${targetYear}`;
}
