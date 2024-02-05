import dayjs, { Dayjs } from "dayjs";
import { format } from "../../services/datetime";

export default function relativeDay(target: Dayjs) {
  if (dayjs().isSame(target, "day")) return "Today";
  if (dayjs().diff(target, "day") === 1) return "Yesterday";
  if (dayjs().diff(target, "day") === -1) return "Tomorrow";

  return format(target, "date");
}
