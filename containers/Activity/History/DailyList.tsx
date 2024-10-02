import { ThemedView } from "@/components/ThemedView";
import HistoryProps from "./HistoryProps";
import HistoryItem from "./HistoryItem";
import { ThemedText } from "@/components/ThemedText";
import generateHistoryHeader from "./generateHistoryHeader";
import dayjs from "dayjs";
import CompletedInfo from "./CompletedInfo";

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
  const totalTime = list.reduce((acc, next) => acc + next.length, 0);
  return (
    <ThemedView>
      <ThemedView
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 10,
          marginRight: 10,
        }}
      >
        <ThemedText>{generateHistoryHeader(date)}</ThemedText>
        <CompletedInfo isOccurrence={isOccurrence} value={totalTime} />
      </ThemedView>
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
