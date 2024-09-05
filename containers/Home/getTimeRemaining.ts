import Schedule from "@/context/schedule/Schedule";

export default function getTimeRemaining(item: Schedule) {
  const { weeklyTarget, doneToday, doneThisWeek } = item;
  return weeklyTarget - doneThisWeek - doneToday;
}
