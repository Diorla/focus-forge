import endTimer from "./endTimer";
import updateUser from "./updateUser";

export default function endStopWatch({
  userId,
  activityId,
  startTime,
  done,
}: {
  userId: string;
  activityId: string;
  startTime: number;
  done: { [key: string]: number };
}) {
  endTimer(activityId, startTime, done);

  return updateUser({
    id: userId,
    startTime: 0,
  });
}
