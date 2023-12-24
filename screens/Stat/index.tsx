import { Card, useTheme } from "@rneui/themed";
import * as React from "react";
import { ScrollView, View } from "react-native";
import TopSpace from "../../components/topSpace";
import ProgressView from "./ProgressView";
import Header from "./Header";

export default function StatScreen() {
  const { theme } = useTheme();

  return (
    <View>
      <View style={{ backgroundColor: theme.colors.primary }}>
        <TopSpace />
        <Header />
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
            flexDirection: "row",
          }}
        >
          <Card>{/*  */}</Card>
          <View style={{ height: 270 }} />
        </View>
      </ScrollView>
    </View>
  );
}
