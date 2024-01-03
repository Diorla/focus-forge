import * as React from "react";
import { View } from "react-native";
import useInterval from "./useInterval";
import Clock from "./Clock";
import * as Progress from "react-native-progress";
import { useTheme } from "@rneui/themed";

export default function Timer({
  startTime,
  targetTime,
  todayTime,
  todayRemaining,
}: {
  startTime: number;
  targetTime: number;
  todayTime: number;
  todayRemaining: number;
}) {
  const {
    theme: { colors },
  } = useTheme();

  const [count, setCount] = React.useState((Date.now() - startTime) / 1000);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Clock time={targetTime - count} />
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
