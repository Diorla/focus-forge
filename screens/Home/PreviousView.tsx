import { ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";
import useActivity from "../../context/activity/useActivity";

export default function PreviousView() {
  const { schedule } = useActivity();
  const previous = schedule.filter((item) => item.doneThisWeek);
  if (previous.length)
    return (
      <>
        <SectionHeader title="Past activities" />
        <ScrollView horizontal>
          {previous.map((item) => (
            <ActivityCard key={item.id} schedule={item} type="previous" />
          ))}
        </ScrollView>
      </>
    );
  return null;
}
