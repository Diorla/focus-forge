import { format } from "@/services/datetime";
import dayjs from "dayjs";

export default function generateHistoryHeader(date: string) {
  if (dayjs(date).isToday()) return "Today";
  if (dayjs().diff(date, "day") === 1) return "Yesterday";
  if (dayjs().diff(date, "week") === 0) return dayjs(date).format("dddd");
  if (dayjs().diff(date, "day") === 7)
    return "Last " + dayjs(date).format("dddd");
  return format(date, "date");
}
