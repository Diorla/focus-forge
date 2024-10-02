import { ScrollView } from "react-native";
import useSchedule from "../../context/schedule/useSchedule";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ActivityCard from "@/components/ActivityCard";
import getHoursRemaining from "./getHoursRemaining";

const isTimePassed = (time: number) => time < new Date().getHours();
const sortByTimePassed = (prev = 0, next = 0) => {
  if (isTimePassed(prev) && isTimePassed(next)) return 0;
  if (isTimePassed(prev)) return -1;
  if (isTimePassed(next)) return 1;
  return prev - next;
};

export default function TodoView() {
  const { checklist } = useSchedule();

  const todo = checklist.filter((item) => item.remaining);

  console.log(
    todo
      .filter((item) => !item.archived)
      .map((item) => {
        return {
          name: item.name,
          start: item.occurrenceStart,
        };
      })
  );

  return (
    <ThemedView style={{ marginVertical: 8, paddingVertical: 8 }}>
      <ThemedText type="title" style={{ paddingHorizontal: 4 }}>
        To do
      </ThemedText>
      <ScrollView horizontal style={{ paddingBottom: 16 }}>
        {todo
          .filter((item) => !item.archived)
          .sort((a, b) => a.doneTimes - b.doneTimes)
          .sort((a, b) => getHoursRemaining(a) - getHoursRemaining(b))
          .sort((a, b) =>
            sortByTimePassed(a.occurrenceStart, b.occurrenceStart)
          )
          .map((item) => (
            <ActivityCard item={item} key={item.id} type="todo" />
          ))}
      </ScrollView>
    </ThemedView>
  );
}
