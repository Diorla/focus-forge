import * as React from "react";
import { Typography } from "../../components";
import { secondsToHrMm } from "../../services/datetime";

export default function Clock({
  time,
  color,
}: {
  time: number;
  color?: string;
}) {
  const [hr, mm, ss] = secondsToHrMm(time);
  return (
    <Typography style={{ color }}>
      {String(Math.floor(hr)).padStart(2, "0")}:
      {String(Math.floor(mm)).padStart(2, "0")}:
      {String(Math.floor(ss)).padStart(2, "0")}
    </Typography>
  );
}
