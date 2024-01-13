import dayjs from "dayjs";
import DateType from "./DateType";

/**
 * Used to generate a uniform date key for the current date. the format is also
 * easy to convert back into date object. It should be used to keep record of
 * any data for a particular day.
 * @returns
 */
export default function getDateKey(date?: DateType) {
  return dayjs(date).format("YYYY-MM-DD");
}
