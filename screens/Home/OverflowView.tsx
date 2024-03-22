import { ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";
import useSchedule from "../../context/schedule/useSchedule";

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
