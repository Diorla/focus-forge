import * as React from "react";
import { AppState, View } from "react-native";
import useInterval from "./useInterval";
import Clock from "./Clock";
import * as Progress from "react-native-progress";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import useActivity from "../../context/activity/useActivity";
import { getDateTimeKey } from "../../services/datetime";
import { useKeepAwake } from "expo-keep-awake";

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
  const {
    theme: { colors },
  } = useTheme();

  const { updateActivity, createDone } = useActivity();
  const [count, setCount] = useState((Date.now() - startTime) / 1000);

  const endTimer = (id: string, startTime: number) => {
    const key = getDateTimeKey(startTime);

    // reset the activity time to 0
    updateActivity(id, {
      timerStart: 0,
      timerLength: 0,
      timerId: "",
    });

    // Create info about done task
    return createDone({
      id: key,
      datetime: startTime,
      comment: "",
      activityId: id,
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
