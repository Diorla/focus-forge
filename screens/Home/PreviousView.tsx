import { ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";
import useSchedule from "../../context/schedule/useSchedule";

export default function PreviousView() {
  const { schedule } = useSchedule();
  const previous = schedule.filter((item) => item.doneThisWeek);
  if (previous.length)
    return (
      <>
        <SectionHeader title="Past activities" />
        <ScrollView horizontal>
          {previous
            .sort((prev, next) => prev.lastDone - next.lastDone)
            .map((item) => (
              <ActivityCard key={item.id} schedule={item} type="previous" />
            ))}
        </ScrollView>
      </>
    );
  return null;
}
