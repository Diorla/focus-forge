import { ThemedView } from "@/components/ThemedView";
import HistoryProps from "./HistoryProps";
import HistoryItem from "./HistoryItem";
import { ThemedText } from "@/components/ThemedText";
import generateHistoryHeader from "./generateHistoryHeader";
import dayjs from "dayjs";

export default function DailyList({
  list,
  isOccurrence,
  activityId,
  date,
}: {
  list: HistoryProps[];
  isOccurrence: boolean;
  activityId: string;
  date: string;
}) {
  return (
    <ThemedView>
      <ThemedText>{generateHistoryHeader(date)}</ThemedText>
      <ThemedView>
        {list
          .sort((a, b) => dayjs(b.datetime).diff(a.datetime))
          .map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              activityId={activityId}
              isOccurrence={isOccurrence}
            />
          ))}
      </ThemedView>
    </ThemedView>
  );
}
