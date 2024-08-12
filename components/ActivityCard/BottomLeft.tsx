import { priorityList } from "@/constants/Priority";
import { OccurrenceType } from "@/context/data/model/ActivityModel";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { getDateMessage } from "./getDateMessage";

export default function BottomLeft({
  isOccurrence,
  priority,
  occurrenceType,
}: {
  isOccurrence: boolean;
  priority: number;
  occurrenceType: OccurrenceType;
}) {
  if (isOccurrence) {
    return (
      <ThemedView>
        <ThemedText style={{ textTransform: "capitalize" }}>
          {getDateMessage(occurrenceType)}
        </ThemedText>
      </ThemedView>
    );
  }
  return (
    <ThemedText style={{ textTransform: "capitalize" }}>
      {priorityList[priority] || "None"}
    </ThemedText>
  );
}
