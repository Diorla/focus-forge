import updateActivity from "@/services/database/updateActivity";

export default function startTimer(
  id: string,
  length: number,
  notificationId: string
) {
  return updateActivity({
    id,
    timerStart: Date.now(),
    timerLength: length,
    timerId: notificationId,
  });
}
