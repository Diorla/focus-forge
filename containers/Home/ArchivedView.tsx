import { ScrollView } from "react-native";
import SectionHeader from "./SectionHeader";
import useSchedule from "@/context/schedule/useSchedule";
import { ThemedView } from "@/components/ThemedView";
import ArchiveCard from "./ArchiveCard";

export default function ArchivedView() {
  const { schedule, checklist } = useSchedule();
  const archivedSchedule = schedule.filter((item) => item.archived);
  const archivedChecklist = checklist.filter((item) => item.archived);

  const archived = [...archivedSchedule, ...archivedChecklist];
  if (archived.length)
    return (
      <ThemedView style={{ marginVertical: 8, paddingVertical: 8 }}>
        <SectionHeader title="Archived" />
        <ScrollView horizontal>
          {archived
            .sort((prev, next) => prev.lastDone - next.lastDone)
            .map((item) => (
              <ArchiveCard activity={item} key={item.id} />
            ))}
        </ScrollView>
      </ThemedView>
    );
  return null;
}
