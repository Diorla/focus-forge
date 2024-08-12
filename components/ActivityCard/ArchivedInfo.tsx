import ActivityModel from "@/context/data/model/ActivityModel";
import { format } from "@/services/datetime";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export default function ArchivedInfo({ item }: { item: ActivityModel }) {
  const { archived } = item;
  return (
    <ThemedView
      style={{
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <ThemedText>Archived: {format(archived, "date")}</ThemedText>
    </ThemedView>
  );
}
