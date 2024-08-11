import DoneType from "@/context/data/types/DoneType";
import {
  getDateKey,
  secondsToHrMm,
  format,
  getDateTimeKey,
} from "@/services/datetime";
import HistoryProps from "./HistoryProps";

export default function generateHistory(done: { [key: string]: DoneType }) {
  const history: { [key: string]: HistoryProps[] } = {};
  Object.keys(done).forEach((item) => {
    const { comment, length, datetime } = done[item];
    const date = getDateKey(item);
    const [hr, mm] = secondsToHrMm(length);
    const obj = {
      time: format(item, "time"),
      description: `${hr}h ${String(mm).padStart(2, "0")}`,
      // datetime was used as key before
      // this only applies to alpha apps
      datetime: datetime ? getDateTimeKey(datetime) : getDateTimeKey(item),
      comment: comment,
      length: length,
      id: item,
    };
    if (history[date]) {
      history[date].push(obj);
    } else {
      history[date] = [obj];
    }
  });
  return history;
}
