import dayjs, { Dayjs } from "dayjs";

export default function getDDMMYY(target: Dayjs) {
  const date = dayjs(target).date();
  const month = dayjs(target).month();
  const year = dayjs(target).year().toString().slice(-2);
  return [date, month, year];
}
