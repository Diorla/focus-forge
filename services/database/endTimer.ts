import getDateTimeKey from "../datetime/getDateTimeKey";
import updateActivity from "./updateActivity";

export default function endTimer(
  id: string,
  startTime: number,
  done: {
    [key: string]: number;
  },
  endTime?: number
) {
  const now = endTime ?? Date.now();
  const length = (now - startTime) / 1000;
  const key = getDateTimeKey(now);
  updateActivity({
    id,
    timer: null,
    done: {
      ...done,
      [key]: length,
    },
  });
}
