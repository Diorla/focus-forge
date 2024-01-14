import updateUser from "./updateUser";

export default function startStopWatch(id: string) {
  return updateUser({
    id,
    startTime: Date.now(),
  });
}
