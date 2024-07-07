import { secondsToHrMm } from "@/services/datetime";

export default function timeAbbrev(value: number) {
  const [h, m, s] = secondsToHrMm(value);
  if (h) return `${h}h`;
  if (m) return `${m}m`;
  return `${s}s`;
}
