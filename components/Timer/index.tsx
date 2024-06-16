import * as React from "react";
import { AppState } from "react-native";
import * as Progress from "react-native-progress";
import { useEffect, useState } from "react";
import { getDateTimeKey } from "../../services/datetime";
import { useKeepAwake } from "expo-keep-awake";
import useDataQuery from "../../context/data/useDataQuery";
import useInterval from "@/hooks/useTimeInterval";
import Clock from "./Clock";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import updateActivity from "@/services/database/updateActivity";

export default function Timer({
  startTime,
  targetTime,
  id,
  type = "today",
  doneToday = 0,
  length,
}: {
  startTime: number;
  targetTime: number;
  id: string;
  type?: "today" | "task";
  doneToday: number;
  length: number;
}) {
  useKeepAwake();
  const theme = useThemeColor();

  const { activityList } = useDataQuery();
  const [count, setCount] = useState((Date.now() - startTime) / 1000);

  const createDone = (currentDone: {
    comment: string;
    length: number;
    startTime: number;
  }) => {
    const done = activityList.filter((activity) => activity.id === id)[0].done;
    const datetime = getDateTimeKey(currentDone.startTime);
    updateActivity({ done: { ...done, [datetime]: currentDone }, id });
  };
  const endTimer = (id: string, startTime: number) => {
    const key = getDateTimeKey(startTime);

    // reset the activity time to 0
    updateActivity({
      timerStart: 0,
      timerLength: 0,
      timerId: "",
      id,
    });

    // Create info about done task
    return createDone({
      comment: "",
      startTime,
      length,
    });
  };
  useInterval(() => {
    if (length <= count && type === "today") endTimer(id, startTime);
    else setCount(count + 1);
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

  return (
    <ThemedView style={{ alignItems: "center", justifyContent: "center" }}>
      <Clock time={value < 0 ? 0 : value} />
      <Progress.Bar
        progress={(doneToday + count) / targetTime}
        color={theme.primary}
        unfilledColor={theme.grey0}
        borderColor={theme.grey5}
        width={250}
      />
    </ThemedView>
  );
}
