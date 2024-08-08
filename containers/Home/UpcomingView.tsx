import { ScrollView } from "react-native";
import SectionHeader from "./SectionHeader";
import useSchedule from "../../context/schedule/useSchedule";
import TimeFormat from "@/components/TimeFormat";
import { ThemedView } from "@/components/ThemedView";
import ProjectCard from "@/components/ProjectCard";

export default function UpcomingView() {
  const { schedule } = useSchedule();
  const upcoming = schedule.filter((item) => item.upcomingTime);
  const time = upcoming
    .map((item) => item.upcomingTime)
    .reduce((prev, curr) => prev + curr, 0);

  if (upcoming.length)
    return (
      <ThemedView style={{ marginVertical: 8, paddingVertical: 8 }}>
        <SectionHeader title="Upcoming" extra={<TimeFormat value={time} />} />
        <ScrollView horizontal style={{ paddingBottom: 16 }}>
          {upcoming
            .sort((prev, next) => next.upcomingTime - prev.upcomingTime)
            .map((item) => (
              <ProjectCard key={item.id} item={item} type="upcoming" />
            ))}
        </ScrollView>
      </ThemedView>
    );
  return null;
}
