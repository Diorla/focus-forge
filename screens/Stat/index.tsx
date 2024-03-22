import { Card, useTheme } from "@rneui/themed";
import * as React from "react";
import { ScrollView, View } from "react-native";
import TopSpace from "../../components/topSpace";
import ProgressView from "./ProgressView";
import { ButtonGroup } from "@rneui/base";
import { useState } from "react";
import WeekRender from "./WeekRender";
import DayRender from "./DayRender";
import useSchedule from "../../context/schedule/useSchedule";
import { TimeFormat, Typography } from "../../components";
import Count from "./Count";

export default function StatScreen() {
  const { theme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { schedule } = useSchedule();
  const high = schedule.filter((activity) => activity.priority === "high");
  const medium = schedule.filter((activity) => activity.priority === "medium");
  const low = schedule.filter((activity) => activity.priority === "low");
  const none = schedule.filter((activity) => activity.priority === "none");
  const time = schedule.reduce((acc, curr) => acc + curr.weeklyTarget, 0);
  return (
    <View>
      <View style={{ backgroundColor: theme.colors.primary }}>
        <TopSpace />
      </View>
      <ScrollView
        style={{
          backgroundColor: theme.colors.primary,
        }}
      >
        <ProgressView />

        <View
          style={{
            backgroundColor: theme.colors.white,
            flex: 1,
          }}
        >
          <Card containerStyle={{ marginVertical: 16 }}>
            <View style={{ alignItems: "center" }}>
              <Typography style={{ textAlign: "center" }}>
                {schedule.length} Activities
              </Typography>
              <TimeFormat value={time} />
            </View>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Count activity={high} type="High" color={theme.colors.error} />
              <Count
                activity={medium}
                type="Medium"
                color={theme.colors.warning}
              />
              <Count activity={low} type="Low" color={theme.colors.success} />
              <Count activity={none} type="None" color={theme.colors.grey0} />
            </View>
          </Card>
          <ButtonGroup
            buttonStyle={{ padding: 10 }}
            buttons={["Week", "Day"]}
            selectedIndex={selectedIndex}
            onPress={setSelectedIndex}
          />
          {selectedIndex === 0 ? <WeekRender /> : <DayRender />}
          <View style={{ height: 240 }} />
        </View>
      </ScrollView>
    </View>
  );
}
