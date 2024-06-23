import { getDateTimeKey } from "../datetime";
import updateActivity from "@/services/database/updateActivity";

export default function endTimer(
  id: string,
  startTime: number,
  done: { [key: string]: { length: number; comment: string } }
) {
  const length = (Date.now() - startTime) / 1000;
  const key = getDateTimeKey(startTime);

  updateActivity({
    id,
    timerStart: 0,
    timerLength: 0,
    timerId: "",
    done: {
      ...done,
      [key]: {
        length,
        comment: "",
      },
    },
  });
}
