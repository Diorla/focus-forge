import * as React from "react";
import { AppState, View } from "react-native";
import useInterval from "./useInterval";
import Clock from "./Clock";
import * as Progress from "react-native-progress";
import { useTheme } from "@rneui/themed";
import endTimer from "../../services/database/endTimer";
import { useEffect, useState } from "react";
import useActivity from "../../context/activity/useActivity";

export default function Timer({
  startTime,
  targetTime,
  id,
  done,
  type = "today",
  doneToday = 0,
  length,
}: {
  startTime: number;
  targetTime: number;
  id: string;
  done: { [key: string]: number };
  type?: "today" | "task";
  doneToday: number;
  length: number;
}) {
  const { updateActivity } = useActivity();
  const {
    theme: { colors },
  } = useTheme();

  const [count, setCount] = useState((Date.now() - startTime) / 1000);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        setCount((Date.now() - startTime) / 1000);
      }
    });
    return () => subscription.remove();
  }, [startTime]);

  const value = targetTime - doneToday - count;
  if (length <= count && type === "today")
    updateActivity(
      id,
      endTimer(id, startTime, done, startTime + length * 1000)
    );
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Clock time={value < 0 ? 0 : value} />
      <Progress.Bar
        progress={(doneToday + count) / targetTime}
        color={colors.primary}
        unfilledColor={colors.grey5}
        borderColor={colors.grey0}
        width={250}
      />
    </View>
  );
}
