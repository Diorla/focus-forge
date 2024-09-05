import * as React from "react";
import { secondsToHrMm } from "../../services/datetime";
import { ThemedText } from "../ThemedText";

export default function Time({ time }: { time: number }) {
  const [hh, mm, ss] = secondsToHrMm(time);
  return (
    <ThemedText>
      {hh}h {mm}m {ss}s
    </ThemedText>
  );
}
