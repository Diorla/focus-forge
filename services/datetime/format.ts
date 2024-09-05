import dayjs, { Dayjs } from "dayjs";

export default function format(
  date?: string | number | Date | Dayjs,
  type?: "time" | "date" | "datetime"
) {
  if (type === "time") return dayjs(date).format("HH:mm");
  if (type === "date") return dayjs(date).format("DD MMM YYYY");

  return dayjs(date).format("HH:mm, DD MMM YYYY");
}
