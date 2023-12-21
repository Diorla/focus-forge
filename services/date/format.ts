import dayjs, { Dayjs } from "dayjs";

export default function format(date?: string | number | Date | Dayjs) {
  return dayjs(date).format("HH:mm, DD-MMM-YYYY");
}
