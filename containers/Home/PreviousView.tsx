import { ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";
import useSchedule from "@/context/schedule/useSchedule";
import { ThemedView } from "@/components/ThemedView";

export default function PreviousView() {
  const { schedule } = useSchedule();
  const previous = schedule.filter((item) => item.doneThisWeek);
  if (previous.length)
    return (
      <ThemedView style={{ marginVertical: 16 }}>
        <SectionHeader title="Past activities" />
        <ScrollView horizontal style={{ paddingBottom: 16 }}>
          {previous
            .sort((prev, next) => prev.lastDone - next.lastDone)
            .map((item) => (
              <ActivityCard key={item.id} schedule={item} type="previous" />
            ))}
        </ScrollView>
      </ThemedView>
    );
  return null;
}
