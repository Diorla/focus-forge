import { ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";
import useSchedule from "../../context/schedule/useSchedule";

export default function RecentView() {
  const { schedule = [] } = useSchedule();

  // I used 0.001 instead of 0 because of precision error from floating point
  // that results in stuff like 0.00000000000006 instead of 0
  // 0.001 is 1 millisecond in seconds
  // I could use decimal.js https://mikemcl.github.io/decimal.js/ if need be
  const completed = schedule
    .filter((item) => {
      return item.todayTime - item.doneToday <= 0.001 && item.doneToday;
    })
    .sort((a, b) => {
      return a.lastDone - b.lastDone;
    });

  if (completed.length)
    return (
      <>
        <SectionHeader title="Recent" />
        <ScrollView horizontal>
          {completed
            .sort((prev, next) => next.lastDone - prev.lastDone)
            .map((item) => (
              <ActivityCard key={item.id} schedule={item} type="recent" />
            ))}
        </ScrollView>
      </>
    );
  return null;
}
