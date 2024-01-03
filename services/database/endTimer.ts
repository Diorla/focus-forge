import getDateTimeKey from "../date/getDateTimeKey";
import updateActivity from "./updateActivity";

export default function endTimer(
  id: string,
  startTime: number,
  done: {
    [key: string]: number;
  }
) {
  const length = (Date.now() - startTime) / 1000;
  const key = getDateTimeKey();
  updateActivity({
    id,
    timer: null,
    done: {
      ...done,
      [key]: length,
    },
  });
}
