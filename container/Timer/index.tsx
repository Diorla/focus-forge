import * as React from "react";
import { View } from "react-native";
import useInterval from "./useInterval";
import Clock from "./Clock";
import * as Progress from "react-native-progress";
import { useTheme } from "@rneui/themed";
import endTimer from "../../services/database/endTimer";

export default function Timer({
  startTime,
  targetTime,
  todayTime,
  todayRemaining,
  id,
  done,
  type = "today",
}: {
  startTime: number;
  targetTime: number;
  todayTime: number;
  todayRemaining: number;
  id: string;
  done: { [key: string]: number };
  type?: "today" | "task";
}) {
  const {
    theme: { colors },
  } = useTheme();

  const [count, setCount] = React.useState((Date.now() - startTime) / 1000);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  const value = targetTime - count;
  if (targetTime <= count && type === "today")
    endTimer(id, startTime, done, startTime + targetTime * 1000);
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Clock time={value < 0 ? 0 : value} />
      <Progress.Bar
        progress={(todayTime - todayRemaining + count) / todayTime}
        color={colors.primary}
        unfilledColor={colors.grey5}
        borderColor={colors.grey0}
        width={250}
      />
    </View>
  );
}
