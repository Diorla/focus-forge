import { ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";
import useSchedule from "@/context/schedule/useSchedule";
import { ThemedView } from "@/components/ThemedView";

export default function ArchivedView() {
  const { schedule } = useSchedule();
  const archived = schedule.filter((item) => item.archived);
  if (archived.length)
    return (
      <ThemedView style={{ marginVertical: 16 }}>
        <SectionHeader title="Archived" />
        <ScrollView horizontal>
          {archived
            .sort((prev, next) => prev.lastDone - next.lastDone)
            .map((item) => (
              <ActivityCard key={item.id} schedule={item} type="previous" />
            ))}
        </ScrollView>
      </ThemedView>
    );
  return null;
}
