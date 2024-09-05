import * as React from "react";
import Time from "./Time";
import { useKeepAwake } from "expo-keep-awake";
import useInterval from "@/hooks/useTimeInterval";
import { ThemedView } from "../ThemedView";

export default function Clock({ startTime }: { startTime: number }) {
  const [count, setCount] = React.useState((Date.now() - startTime) / 1000);

  useKeepAwake();
  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  const value = (Date.now() - startTime) / 1000;
  return (
    <ThemedView style={{ alignItems: "center", justifyContent: "center" }}>
      <Time time={value < 0 ? 0 : value} />
    </ThemedView>
  );
}
