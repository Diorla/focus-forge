import Schedule from "@/context/schedule/Schedule";

export default function generateCardTime(
  type: "completed" | "overflow" | "upcoming" | "previous" | "recent",
  schedule: Schedule
) {
  if (type === "overflow") return schedule.overflowTime;
  if (type === "upcoming") return schedule.upcomingTime;
  if (type === "previous") return schedule.doneThisWeek;
  return schedule.doneToday;
}
