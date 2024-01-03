import { ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";
import useActivity from "../../context/activity/useActivity";

export default function RecentView() {
  const { schedule = [] } = useActivity();

  const completed = schedule.filter((item) => {
    return item.todayRemaining <= 0;
  });

  if (completed.length)
    return (
      <>
        <SectionHeader title="Recent" />
        <ScrollView horizontal>
          {completed.map((item) => (
            <ActivityCard
              key={item.id}
              showList={() => console.log("show check list")}
              schedule={item}
              type="completed"
            />
          ))}
        </ScrollView>
      </>
    );
  return null;
}
