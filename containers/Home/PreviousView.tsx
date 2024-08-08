import { ScrollView } from "react-native";
import SectionHeader from "./SectionHeader";
import useSchedule from "@/context/schedule/useSchedule";
import { ThemedView } from "@/components/ThemedView";
import ProjectCard from "@/components/ProjectCard";

export default function PreviousView() {
  const { schedule, checklist } = useSchedule();
  const previousSchedule = schedule.filter((item) => item.doneThisWeek);
  const done = checklist.filter((item) => !item.remaining);
  const previous = [...previousSchedule, ...done];
  if (previous.length)
    return (
      <ThemedView style={{ marginVertical: 8, paddingVertical: 8 }}>
        <SectionHeader title="Past activities" />
        <ScrollView horizontal style={{ paddingBottom: 16 }}>
          {previous
            .sort((prev, next) => prev.lastDone - next.lastDone)
            .map((item) =>
              item.isOccurrence ? (
                <ProjectCard key={item.id} item={item} type="checked" />
              ) : (
                <ProjectCard key={item.id} item={item} type="previous" />
              )
            )}
        </ScrollView>
      </ThemedView>
    );
  return null;
}
