import * as React from "react";
import { ScrollView, View } from "react-native";
import TopSpace from "../../components/topSpace";
import TabHeader from "../../container/Nav/TabHeader";
import { useState } from "react";
import { Button } from "../../components";
import { Divider } from "@rneui/themed";
import ActivityCard from "./ActivityCard";
import Sort from "./Sort";
import Filter from "./Filter";
import SortFilter from "./SortFilter";

export default function ListScreen() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("alphabetical");
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <TopSpace />
      <TabHeader />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: 8,
        }}
      >
        <View style={{ marginHorizontal: 8 }}>
          <Button onPress={() => setVisible(true)}>Sort</Button>
        </View>
        <Button onPress={() => setVisible(true)}>Filter</Button>
      </View>
      <ScrollView>
        <Divider style={{ marginVertical: 10 }} />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        <View style={{ height: 240 }} />
      </ScrollView>
      <SortFilter
        sort={sort}
        filter={filter}
        setSort={setSort}
        setFilter={setFilter}
        closeModal={() => setVisible(false)}
        visible={visible}
      />
    </View>
  );
}
