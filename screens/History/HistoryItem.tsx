import * as React from "react";
import { View } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { useTheme } from "@rneui/themed";
import { Typography } from "../../components";
import { secondsToHrMm } from "../../services/datetime";

export default function HistoryItem({
  data,
  date,
}: {
  data: { time: string; title: string; description: string; length: number }[];
  date: string;
}) {
  const { theme } = useTheme();
  const total = data.reduce((prev, curr) => prev + curr.length, 0);
  const [hr, mm] = secondsToHrMm(total);
  return (
    <View
      style={{
        margin: 4,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 24,
          paddingHorizontal: 8,
        }}
      >
        <Typography type="header">{date}</Typography>
        <Typography>
          {hr}h {String(mm).padStart(2, "0")}
        </Typography>
      </View>
      <Timeline
        innerCircle="dot"
        isUsingFlatlist={false}
        style={{
          flex: 1,
          marginTop: 20,
        }}
        data={data}
        separator={true}
        circleSize={20}
        circleColor={theme.colors.primary}
        lineColor={theme.colors.grey3}
        timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
        timeStyle={{
          textAlign: "center",
          backgroundColor: theme.colors.secondary,
          color: theme.colors.white,
          padding: 5,
          borderRadius: 13,
          overflow: "hidden",
        }}
        descriptionStyle={{ color: theme.colors.grey2 }}
      />
    </View>
  );
}
