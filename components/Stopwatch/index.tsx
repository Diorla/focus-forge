import * as React from "react";
import { AppState } from "react-native";
import { useEffect, useState } from "react";
import { useKeepAwake } from "expo-keep-awake";
import useInterval from "@/hooks/useTimeInterval";
import Time from "./Time";
import { ThemedView } from "../ThemedView";

export default function Stopwatch({ startTime }: { startTime: number }) {
  useKeepAwake();

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

    return (
      <ThemedView style={{ alignItems: "center", justifyContent: "center" }}>
        <Time time={count < 0 ? 0 : count} />
      </ThemedView>
    );
}
