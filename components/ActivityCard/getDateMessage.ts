export function getDateMessage(occurrenceType: string) {
  if (occurrenceType === "daily") return "Today";
  if (occurrenceType === "weekly") return "This week";
  if (occurrenceType === "monthly") return "This month";
  if (occurrenceType === "yearly") return "This year";
}
