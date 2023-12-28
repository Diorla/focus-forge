import { ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";
import useActivity from "../../context/activity/useActivity";

export default function UpcomingView() {
  const { schedule } = useActivity();
  const upcoming = schedule.filter((item) => item.upcomingTime);
  if (upcoming.length)
    return (
      <>
        <SectionHeader title="Upcoming" />
        <ScrollView horizontal>
          {upcoming.map((item) => (
            <ActivityCard
              key={item.id}
              showList={() => console.log("show check list")}
              schedule={item}
              type="upcoming"
            />
          ))}
        </ScrollView>
      </>
    );
  return null;
}
