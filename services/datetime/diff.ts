import dayjs from "dayjs";

export default function diff(
  date: string,
  type?: "day" | "month" | "year" | "hour" | "minute" | "second" | "millisecond"
): number {
  const today = dayjs();
  const dateToCheck = dayjs(date);
  return today.diff(dateToCheck, type || "day");
}
