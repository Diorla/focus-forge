import { ScrollView } from "react-native";
import useSchedule from "../../context/schedule/useSchedule";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ProjectCard from "@/components/ProjectCard";
import getHoursRemaining from "./getHoursRemaining";

export default function TodoView() {
  const { checklist } = useSchedule();

  const todo = checklist.filter((item) => item.remaining);

  return (
    <ThemedView style={{ marginVertical: 8, paddingVertical: 8 }}>
      <ThemedText type="title" style={{ paddingHorizontal: 4 }}>
        To do
      </ThemedText>
      <ScrollView horizontal style={{ paddingBottom: 16 }}>
        {todo
          .filter((item) => !item.archived)
          .sort((a, b) => a.doneTimes - b.doneTimes)
          .sort((a, b) => (a.occurrenceStart || 0) - (b.occurrenceStart || 0))
          .sort((a, b) => getHoursRemaining(a) - getHoursRemaining(b))
          .map((item) => (
            <ProjectCard item={item} key={item.id} type="todo" />
          ))}
      </ScrollView>
    </ThemedView>
  );
}
