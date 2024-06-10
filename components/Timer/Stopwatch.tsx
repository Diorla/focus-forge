import * as React from "react";
import { View } from "react-native";
import Clock from "./Clock";
import { useKeepAwake } from "expo-keep-awake";
import useInterval from "@/hooks/useTimeInterval";

export default function StopWatch({ startTime }: { startTime: number }) {
  const [count, setCount] = React.useState((Date.now() - startTime) / 1000);

  useKeepAwake();
  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  const value = (Date.now() - startTime) / 1000;
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Clock time={value < 0 ? 0 : value} />
    </View>
  );
}
