import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TimeFormat from "@/components/TimeFormat";
import Schedule from "@/context/schedule/Schedule";
import { secondsToHrMm } from "@/services/datetime";
import React from "react";

export default function Time({
  activity,
  color,
}: {
  activity: Schedule;
  color: string;
}) {
  const { doneThisWeek, weeklyTarget, doneToday, todayTime } = activity;

  const allDoneThisWeek =
    doneThisWeek + doneToday + 0.00000000000000000000000001;
  const allTodoToday = todayTime + 0.00000000000000000000000001;

  const timeLeftThisWeek = weeklyTarget - allDoneThisWeek;
  const [h, m] = secondsToHrMm(timeLeftThisWeek <= 0 ? 0 : timeLeftThisWeek);
  // TODO: Use decimal formatting and eliminate this less than 0.0001
  const todayRemaining = allTodoToday - doneToday;
  const [hh, mm] = secondsToHrMm(todayRemaining < 0.0001 ? 0 : todayRemaining);

  const weekPercent = (allDoneThisWeek / weeklyTarget) * 100;
  const dayPercent = (doneToday / allTodoToday) * 100;

  return (
    <ThemedView
      style={{
        marginTop: 20,
        backgroundColor: "transparent",
      }}
    >
      <ThemedText
        type="title"
        color={color}
        style={{ textAlign: "center", marginBottom: 8 }}
      >
        Todo
      </ThemedText>
      <ThemedView
        style={{
          backgroundColor: "transparent",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <ThemedView style={{ backgroundColor: "transparent" }}>
          <ThemedText
            color={color}
            style={{ backgroundColor: "transparent", textAlign: "center" }}
          >
            This week
          </ThemedText>
          <ThemedText
            type="subtitle"
            color={color}
            style={{ textAlign: "center" }}
          >
            {h}h {String(m).padStart(2, "0")}
          </ThemedText>
          <TimeFormat
            color={color}
            value={allDoneThisWeek}
            style={{ textAlign: "center" }}
          />
          <ThemedText
            type="defaultSemiBold"
            color={color}
            style={{ textAlign: "center" }}
          >
            {weekPercent.toFixed(2)}%
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ backgroundColor: "transparent" }}>
          <ThemedText color={color} style={{ textAlign: "center" }}>
            Today
          </ThemedText>
          <ThemedText
            type="subtitle"
            color={color}
            style={{ textAlign: "center" }}
          >
            {hh}h {String(mm).padStart(2, "0")}
          </ThemedText>
          <TimeFormat
            color={color}
            value={doneToday}
            style={{ textAlign: "center" }}
          />
          <ThemedText
            type="defaultSemiBold"
            color={color}
            style={{ textAlign: "center" }}
          >
            {dayPercent.toFixed(2)}%
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
