import { ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";
import useSchedule from "@/context/schedule/useSchedule";
import { ThemedView } from "@/components/ThemedView";
import Schedule from "@/context/schedule/Schedule";
import DoneCard from "./DoneCard";
import Checklist from "@/context/schedule/Checklist";

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
                <DoneCard key={item.id} activity={item as Checklist} />
              ) : (
                <ActivityCard
                  key={item.id}
                  schedule={item as Schedule}
                  type="previous"
                />
              )
            )}
        </ScrollView>
      </ThemedView>
    );
  return null;
}
