import { ThemedText } from "@/components/ThemedText";
import Schedule from "@/context/schedule/Schedule";
import { Link } from "expo-router";
import TaskTime from "@/components/Timer/Time";

export default function ProjectInfo({
  currentTask,
}: {
  currentTask: Schedule;
}) {
  const { todayTime, upcomingTime, doneToday } = currentTask;
  return (
    <>
      <ThemedText
        type="defaultSemiBold"
        style={{ textAlign: "center", marginTop: 48 }}
      >
        <Link href={`/activity/${currentTask.id}`}>{currentTask?.name}</Link>
      </ThemedText>
      <ThemedText style={{ textAlign: "center" }}>
        {currentTask?.description}
      </ThemedText>
      <TaskTime time={todayTime + upcomingTime - doneToday} />
    </>
  );
}
