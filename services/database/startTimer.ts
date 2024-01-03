import updateActivity from "./updateActivity";

export default function startTimer(id: string) {
  updateActivity({ id, timer: { startTime: Date.now() } });
}
