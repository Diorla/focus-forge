import * as React from "react";
import { secondsToHrMm } from "../services/datetime";
import Typography, { TypographyProps } from "./typography";

interface TimeFormatProps extends Partial<TypographyProps> {
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
    <Typography color={color} {...props}>
      {h}h {String(m).padStart(2, "0")}
    </Typography>
  );
}
