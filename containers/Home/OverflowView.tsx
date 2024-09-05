import useSchedule from "@/context/schedule/useSchedule";
import { ScrollView } from "react-native";
import SectionHeader from "./SectionHeader";
import { ThemedView } from "@/components/ThemedView";
import ActivityCard from "@/components/ActivityCard";

export default function OverflowView() {
  const { schedule = [] } = useSchedule();
  const overflow = schedule.filter((item) => item.overflowTime);
  if (overflow.length)
    return (
      <ThemedView style={{ marginVertical: 16 }}>
        <SectionHeader title="Overflow" />
        <ScrollView horizontal>
          {overflow.map((item) => (
            <ActivityCard key={item.id} item={item} type="overflow" />
          ))}
        </ScrollView>
      </ThemedView>
    );
  return null;
}
