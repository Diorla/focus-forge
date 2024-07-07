import { OccurrenceType } from "@/context/data/model/ActivityModel";

export default function occurrenceAbbrev(
  value: number,
  period: OccurrenceType
) {
  if (period === "daily") return `${value} per day`;
  if (period === "weekly") return `${value} per week`;
  return `${value} per month`;
}
