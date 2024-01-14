import updateActivity from "./updateActivity";

export default function startTimer(id: string) {
  return updateActivity({ id, timer: { startTime: Date.now() } });
}
