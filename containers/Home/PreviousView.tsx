import { ScrollView } from "react-native";
import SectionHeader from "./SectionHeader";
import useSchedule from "@/context/schedule/useSchedule";
import { ThemedView } from "@/components/ThemedView";
import ActivityCard from "@/components/ActivityCard";

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
                <ActivityCard key={item.id} item={item} type="checked" />
              ) : (
                <ActivityCard key={item.id} item={item} type="previous" />
              )
            )}
        </ScrollView>
      </ThemedView>
    );
  return null;
}
