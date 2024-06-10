import useSchedule from "@/context/schedule/useSchedule";
import { ScrollView } from "react-native";
import SectionHeader from "./SectionHeader";
import ActivityCard from "./ActivityCard";

export default function OverflowView() {
  const { schedule = [] } = useSchedule();
  const overflow = schedule.filter((item) => item.overflowTime);
  if (overflow.length)
    return (
      <>
        <SectionHeader title="Overflow" />
        <ScrollView horizontal>
          {overflow.map((item) => (
            <ActivityCard key={item.id} schedule={item} type="overflow" />
          ))}
        </ScrollView>
      </>
    );
  return null;
}
