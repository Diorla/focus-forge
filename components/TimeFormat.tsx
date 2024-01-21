import * as React from "react";
import { secondsToHrMm } from "../services/datetime";
import Typography from "./typography";

export default function TimeFormat({
  value,
  color,
}: {
  value: number;
  color?: string;
}) {
  const [h, m] = secondsToHrMm(value);
  return (
    <Typography color={color}>
      {h}h {String(m).padStart(2, "0")}
    </Typography>
  );
}
