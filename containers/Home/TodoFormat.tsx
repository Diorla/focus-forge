import { ThemedText } from "@/components/ThemedText";

import { OccurrenceType } from "@/context/data/model/ActivityModel";
import occurrenceAbbrev from "./occurrenceAbbrev";

export default function TodoFormat({
  occurrence,
  occurrenceType,
  color,
}: {
  occurrence: number;
  occurrenceType: OccurrenceType;
  color?: string;
}) {
  return (
    <ThemedText color={color}>
      {occurrenceAbbrev(occurrence, occurrenceType)}
    </ThemedText>
  );
}
