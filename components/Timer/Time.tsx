import * as React from "react";
import { secondsToHrMm } from "../../services/datetime";
import { ThemedText } from "../ThemedText";

export default function Time({ time }: { time: number }) {
  const [hr, mm, ss] = secondsToHrMm(time);
  return (
    <ThemedText>
      {String(Math.floor(hr)).padStart(2, "0")}:
      {String(Math.floor(mm)).padStart(2, "0")}:
      {String(Math.floor(ss)).padStart(2, "0")}
    </ThemedText>
  );
}
