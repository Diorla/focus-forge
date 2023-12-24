import * as React from "react";
import { ScrollView, View } from "react-native";
import TopSpace from "../../components/topSpace";
import TabHeader from "../../container/Nav/TabHeader";
import { useTheme } from "@rneui/themed";
import HistoryItem from "./HistoryItem";

export default function HistoryScreen() {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <TopSpace />
      <TabHeader />
      <ScrollView>
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: theme.colors.black,
              borderRadius: 5,
            }}
          />
        </View>
      </ScrollView>
      <View style={{ height: 76 }} />
    </View>
  );
}
