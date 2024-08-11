import { format } from "@/services/datetime";
import dayjs from "dayjs";

export default function generateHistoryHeader(date: string) {
  if (dayjs(date).isToday()) return "Today";
  if (dayjs().diff(date, "day") === 1) return "Yesterday";
  return format(date, "date");
}
