import { useTheme } from "@rneui/themed";
import * as React from "react";
import { ScrollView, View } from "react-native";
import TopSpace from "../../components/topSpace";
import ProgressView from "./ProgressView";
import { ButtonGroup } from "@rneui/base";
import { useState } from "react";
import WeekRender from "./WeekRender";
import DayRender from "./DayRender";

export default function StatScreen() {
  const { theme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

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
