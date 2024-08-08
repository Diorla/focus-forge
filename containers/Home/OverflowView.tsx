import useSchedule from "@/context/schedule/useSchedule";
import { ScrollView } from "react-native";
import SectionHeader from "./SectionHeader";
import { ThemedView } from "@/components/ThemedView";
import ProjectCard from "@/components/ProjectCard";

export default function OverflowView() {
  const { schedule = [] } = useSchedule();
  const overflow = schedule.filter((item) => item.overflowTime);
  if (overflow.length)
    return (
      <ThemedView style={{ marginVertical: 16 }}>
        <SectionHeader title="Overflow" />
        <ScrollView horizontal>
          {overflow.map((item) => (
            <ProjectCard key={item.id} item={item} type="overflow" />
          ))}
        </ScrollView>
      </ThemedView>
    );
  return null;
}
