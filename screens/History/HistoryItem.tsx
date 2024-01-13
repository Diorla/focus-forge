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
    <>
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
        style={{ marginTop: 20, flex: 1 }}
        data={data}
        circleSize={20}
        circleColor={theme.colors.primary}
        lineColor={theme.colors.secondary}
        descriptionStyle={{
          color: "gray",
          paddingBottom: 4,
          borderBottomColor: "silver",
          borderBottomWidth: 1,
        }}
        innerCircle="dot"
      />
    </>
  );
}
