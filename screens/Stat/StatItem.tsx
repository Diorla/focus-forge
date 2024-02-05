import * as React from "react";
import { View } from "react-native";
import { TimeFormat, Typography } from "../../components";
import * as Progress from "react-native-progress";
import { useTheme } from "@rneui/themed";

export default function StatItem({
  width,
  title,
  ratio,
  time,
}: {
  width: number;
  title: string;
  ratio: number;
  time: number;
}) {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <View>
      <Typography>{title}</Typography>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Progress.Bar progress={ratio} width={width} color={colors.secondary} />
        <TimeFormat value={time} />
      </View>
    </View>
  );
}
