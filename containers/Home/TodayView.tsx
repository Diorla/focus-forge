import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import useSchedule from "../../context/schedule/useSchedule";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";
import getTimeRemaining from "./getTimeRemaining";
import ExpandedList from "./ExpandedList";
import ActivityCard from "@/components/ActivityCard";

export default function TodayView() {
  const [expanded, setExpanded] = useState(false);
  const { schedule } = useSchedule();
  const { theme } = useUser();

  const today = schedule
    .filter((item) => {
      const todo = item.todayTime - item.doneToday;
      return todo > 0.001 || item.timerLength;
    })
    .sort((a, b) => (b.name > a.name ? -1 : 1))
    .sort((a, b) => b.dailyLimit - a.dailyLimit)
    .sort((a, b) => getTimeRemaining(b) - getTimeRemaining(a))
    .sort((a, b) => b.priority - a.priority)
    .sort((a, b) => b.doneToday - a.doneToday);

  if (today.length) {
    const runningActivity = today.filter((item) => item.timerStart);
    const runningActivityIds = runningActivity.map((item) => item.id);
    const notRunning = today.filter(
      (item) => !runningActivityIds.includes(item.id)
    );
    const first = runningActivity.length ? runningActivity : [today[0]];
    const rest = runningActivity.length ? notRunning : today.slice(1);

    return (
      <ThemedView style={{ marginVertical: 8, paddingVertical: 8 }}>
        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <ThemedText type="title">Today</ThemedText>
          {rest.length ? (
            <ThemedButton
              onPress={() => setExpanded(!expanded)}
              title={expanded ? "Collapse" : "Expand"}
            />
          ) : null}
        </ThemedView>
        <ThemedView>
          {first.map((item) => (
            <ActivityCard item={item} type="today" key={item.id} />
          ))}
          <ExpandedList expanded={expanded} scheduleList={rest} />
        </ThemedView>
        {rest.length ? (
          <ThemedView
            style={{ flexDirection: "row", justifyContent: "center" }}
          >
            <MaterialIcons
              name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={36}
              color={theme.text}
              onPress={() => setExpanded(!expanded)}
            />
          </ThemedView>
        ) : null}
      </ThemedView>
    );
  }
  return null;
}
