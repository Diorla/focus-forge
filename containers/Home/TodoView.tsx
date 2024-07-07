import { ScrollView } from "react-native";
import useSchedule from "../../context/schedule/useSchedule";
import TodoCard from "./TodoCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const occurrenceType = {
  daily: 0,
  weekly: 1,
  monthly: 2,
  yearly: 3,
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
          .sort((a, b) => b.priority - a.priority)
          .sort((a, b) => b.remaining - a.remaining)
          .sort(
            (a, b) =>
              occurrenceType[a.occurrenceType] -
              occurrenceType[b.occurrenceType]
          )
          .map((item) => (
            <TodoCard activity={item} key={item.id} />
          ))}
      </ScrollView>
    </ThemedView>
  );
}
