import * as React from "react";
import { View } from "react-native";
import useInterval from "./useInterval";
import Clock from "./Clock";

export default function StopWatch({ startTime }: { startTime: number }) {
  const [count, setCount] = React.useState((Date.now() - startTime) / 1000);

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
