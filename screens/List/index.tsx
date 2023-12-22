import * as React from "react";
import { ScrollView, Text } from "react-native";
import TopSpace from "../../components/topSpace";
import TabHeader from "../../container/Nav/TabHeader";

export default function ListScreen() {
  return (
    <ScrollView>
      <TopSpace />
      <TabHeader />
    </ScrollView>
  );
}
