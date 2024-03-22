import * as React from "react";
import { View } from "react-native";
import { TimeFormat, Typography } from "../../components";
import Schedule from "../../context/schedule/Schedule";

export default function Count({
  activity,
  type,
  color,
}: {
  activity: Schedule[];
  type: string;
  color: string;
}) {
  const length = activity.length;
  const time = activity.reduce((acc, curr) => acc + curr.weeklyTarget, 0);
  return (
    <View>
      <Typography color={color}>{type}</Typography>
      <Typography color={color} style={{ fontSize: 36 }}>
        {length}
      </Typography>
      <TimeFormat value={time} color={color} />
    </View>
  );
}
