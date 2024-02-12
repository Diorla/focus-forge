import { ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";
import useActivity from "../../context/activity/useActivity";
import { TimeFormat } from "../../components";
import AdsView from "./AdsView";

export default function UpcomingView() {
  const { schedule } = useActivity();
  const upcoming = schedule.filter((item) => item.upcomingTime);
  const time = upcoming
    .map((item) => item.upcomingTime)
    .reduce((prev, curr) => prev + curr, 0);

  if (upcoming.length)
    return (
      <>
        <SectionHeader title="Upcoming" extra={<TimeFormat value={time} />} />
        <ScrollView horizontal>
          {upcoming
            .sort((prev, next) => next.upcomingTime - prev.upcomingTime)
            .map((item) => (
              <ActivityCard key={item.id} schedule={item} type="upcoming" />
            ))}
        </ScrollView>
        <AdsView />
      </>
    );
  return null;
}
