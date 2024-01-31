import updateActivity from "./updateActivity";

export default function startTimer(
  id: string,
  length: number,
  notificationId: string
) {
  return updateActivity({
    id,
    timer: { startTime: Date.now(), length, notificationId },
  });
}
