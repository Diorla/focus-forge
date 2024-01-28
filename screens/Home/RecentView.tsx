import { ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";
import useActivity from "../../context/activity/useActivity";
import dayjs from "dayjs";

export default function RecentView() {
  const { schedule = [] } = useActivity();

  const completed = schedule
    .filter((item) => {
      return (
        item.todayTime - item.doneToday <= 0 && dayjs(item.lastDone).isToday()
      );
    })
    .sort((a, b) => a.lastDone - b.lastDone);

  if (completed.length)
    return (
      <>
        <SectionHeader title="Recent" />
        <ScrollView horizontal>
          {completed.map((item) => (
            <ActivityCard key={item.id} schedule={item} type="completed" />
          ))}
        </ScrollView>
      </>
    );
  return null;
}
