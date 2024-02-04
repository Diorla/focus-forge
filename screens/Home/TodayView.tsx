import { View } from "react-native";
import { Typography } from "../../components";
import TxtButton from "../../components/txtButton";
import { MaterialIcons } from "@expo/vector-icons";
import { TodayCard } from "./TodayCard";
import { useState } from "react";
import useActivity from "../../context/activity/useActivity";

const priority = ["high", "medium", "low", "none"];

export default function TodayView() {
  const [expanded, setExpanded] = useState(false);
  const { schedule } = useActivity();
  const today = schedule
    .filter((item) => {
      const todo = item.todayTime + item.additionalTime - item.doneToday;
      return todo > 0.001 || item.timer;
    })
    .sort(
      (a, b) => priority.indexOf(a.priority) - priority.indexOf(b.priority)
    );

  if (today.length) {
    const runningActivity = today.find((item) => item.timer?.startTime);
    const notRunning = today.filter((item) => item.id !== runningActivity?.id);
    const first = runningActivity ?? today[0];
    const rest = runningActivity ? notRunning : today.slice(1);

    return (
      <View style={{ marginVertical: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <Typography type="header">Today</Typography>
          {rest.length ? (
            <TxtButton onPress={() => setExpanded(!expanded)}>
              {expanded ? "Collapse" : "Expand"}
            </TxtButton>
          ) : null}
        </View>
        <View>
          <TodayCard schedule={first} />
          {expanded ? (
            <>
              {rest
                .sort((a, b) => {
                  if (b.timer) return 1;
                  if (a.timer) return -1;
                  return 0;
                })
                .map((item) => (
                  <TodayCard key={item.id} schedule={item} />
                ))}
            </>
          ) : null}
        </View>
        {rest.length ? (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <MaterialIcons
              name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={36}
              color="black"
              onPress={() => setExpanded(!expanded)}
            />
          </View>
        ) : null}
      </View>
    );
  }
  return null;
}
