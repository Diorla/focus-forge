export default function secondsToHrMm(seconds: number) {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  return [hours, minutes, remainingSeconds];
}
