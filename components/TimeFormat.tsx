import * as React from "react";
import { secondsToHrMm } from "../services/datetime";
import { ThemedText, type ThemedTextProps } from "./ThemedText";

interface TimeFormatProps extends Partial<ThemedTextProps> {
  value: number;
  color?: string;
}

export default function TimeFormat({
  value,
  color,
  ...props
}: TimeFormatProps) {
  const [h, m] = secondsToHrMm(value);
  return (
    <ThemedText color={color} {...props}>
      {h}h {String(m).padStart(2, "0")}
    </ThemedText>
  );
}
