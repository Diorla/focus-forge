import { ScrollView } from "react-native";
import useSchedule from "../../context/schedule/useSchedule";
import TodoCard from "./TodoCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Checklist from "@/context/schedule/Checklist";
import dayjs from "dayjs";

const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const getChecksValue = (item: Checklist) => {
  if (item.occurrenceType === "daily") return 1 / item.remaining;
  if (item.occurrenceType === "weekly") {
    const daysLeft = 7 - dayjs().day();
    const value = daysLeft / item.remaining;
    return value;
  }
  const currentMonth = dayjs().month();
  const daysLeft = daysInMonth[currentMonth] - dayjs().date();
  const value = daysLeft / item.remaining;
  return value;
};

export default function TodoView() {
  const { checklist } = useSchedule();

  const todo = checklist.filter((item) => item.remaining);

  return (
    <ThemedView style={{ marginVertical: 8, paddingVertical: 8 }}>
      <ThemedText type="title" style={{ paddingHorizontal: 4 }}>
        To do
      </ThemedText>
      <ScrollView horizontal>
        {todo
          .sort((a, b) => a.doneTimes - b.doneTimes)
          .sort((a, b) => (a.occurrenceStart || 0) - (b.occurrenceStart || 0))
          .sort((a, b) => getChecksValue(a) - getChecksValue(b))
          .map((item) => (
            <TodoCard activity={item} key={item.id} />
          ))}
      </ScrollView>
    </ThemedView>
  );
}
