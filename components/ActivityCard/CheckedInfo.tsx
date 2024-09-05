import ActivityModel from "@/context/data/model/ActivityModel";
import { format } from "@/services/datetime";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import dayjs from "dayjs";

export default function CheckedInfo({ item }: { item: ActivityModel }) {
  const { done } = item;
  const lastDone = Object.keys(done).sort((a, b) => dayjs(a).diff(b))[0];
  return (
    <ThemedView
      style={{
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <ThemedText>Last done: {format(lastDone, "date")}</ThemedText>
    </ThemedView>
  );
}
