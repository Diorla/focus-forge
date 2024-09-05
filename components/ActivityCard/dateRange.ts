import dayjs from "dayjs";

export default function dateRange(date1: dayjs.Dayjs, date2: dayjs.Dayjs) {
  if (dayjs(date1).isSame(date2, "date"))
    return `From ${date1.format("HH:mm")} to ${date2.format("HH:mm")}`;
  return `From ${date1.format("ddd, HH:mm")} to ${date2.format("ddd, HH:mm")}`;
}
