import dayjs from "dayjs";
import DateType from "./DateType";

/**
 * Used to generate a uniform date key for the current date and time. the format
 * is also easy to convert back into date and time object. It should be used to
 * keep record of any data for a particular date and time.
 * @returns
 */
export default function getDateTimeKey(date?: DateType) {
  return dayjs(date).format("YYYY-MM-DDTHH:mm:ssZ");
}
