import dayjs, { Dayjs } from "dayjs";
import { format } from "../../services/datetime";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export default function relativeDay(target: Dayjs) {
  if (dayjs().isSame(target, "day")) return "Today";
  const difference = dayjs().diff(target, "day");
  if (difference === 1) return "Yesterday";
  if (difference === -1) return "Tomorrow";
  if (difference < 7) return days[dayjs(target).day()];
  if (dayjs().isSame(target, "year")) return dayjs(target).format("DD MMM");
  return format(target, "date");
}
