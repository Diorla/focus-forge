import useSchedule from "@/context/schedule/useSchedule";
import { ScrollView } from "react-native";
import SectionHeader from "./SectionHeader";
import ActivityCard from "./ActivityCard";
import { ThemedView } from "@/components/ThemedView";

export default function OverflowView() {
  const { schedule = [] } = useSchedule();
  const overflow = schedule.filter((item) => item.overflowTime);
  if (overflow.length)
    return (
      <ThemedView style={{ marginVertical: 16 }}>
        <SectionHeader title="Overflow" />
        <ScrollView horizontal>
          {overflow.map((item) => (
            <ActivityCard key={item.id} schedule={item} type="overflow" />
          ))}
        </ScrollView>
      </ThemedView>
    );
  return null;
}
