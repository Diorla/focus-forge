import * as React from "react";
import { View } from "react-native";
import useInterval from "./useInterval";
import Clock from "./Clock";
import * as Progress from "react-native-progress";
import { useTheme } from "@rneui/themed";
import endTimer from "../../services/database/endTimer";
import { useToast } from "react-native-toast-notifications";

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
  const {
    theme: { colors },
  } = useTheme();

  const toast = useToast();
  const [count, setCount] = React.useState((Date.now() - startTime) / 1000);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  const value = targetTime - doneToday - count;
  if (length <= count && type === "today")
    endTimer(id, startTime, done, startTime + length * 1000).then(() =>
      toast.show("Timer completed")
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
