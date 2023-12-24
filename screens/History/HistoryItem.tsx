import * as React from "react";
import { View } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { useTheme } from "@rneui/themed";
import { Typography } from "../../components";
import data from "./data";

export default function HistoryItem() {
  const { theme } = useTheme();
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
        <Typography type="header">06 Nov, 2022</Typography>
        <Typography>8h 40</Typography>
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
