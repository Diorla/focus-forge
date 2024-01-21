import { useTheme } from "@rneui/themed";
import * as React from "react";
import { ScrollView, View } from "react-native";
import TopSpace from "../../components/topSpace";
import ProgressView from "./ProgressView";
import CardButton from "./CardButton";

export default function StatScreen() {
  const { theme } = useTheme();

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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            <CardButton
              title="Compare"
              type="compare"
              source={require("../../assets/versus.png")}
            />
            <CardButton
              title="Daily stats"
              type="daily"
              source={require("../../assets/daily.png")}
            />
            <CardButton
              title="Trends"
              type="trends"
              source={require("../../assets/trend.png")}
            />
            <CardButton
              title="General stat"
              type="general"
              source={require("../../assets/graph.png")}
            />
          </View>
          <View style={{ height: 240 }} />
        </View>
      </ScrollView>
    </View>
  );
}
