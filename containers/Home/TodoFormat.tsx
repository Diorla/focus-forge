import { ThemedText } from "@/components/ThemedText";

import { OccurrenceType } from "@/context/data/model/ActivityModel";

export function occurrenceAbbrev(value: number, period: OccurrenceType) {
  if (period === "daily") return `${value} per day`;
  if (period === "weekly") return `${value} per week`;
  return `${value} per month`;
}

export default function TodoFormat({
  occurrence,
  occurrenceType,
}: {
  occurrence: number;
  occurrenceType: OccurrenceType;
}) {
  return (
    <ThemedText>{occurrenceAbbrev(occurrence, occurrenceType)}</ThemedText>
  );
}
