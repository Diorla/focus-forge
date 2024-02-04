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
import useActivity from "../../context/activity/useActivity";
import Schedule from "../../context/activity/Schedule";

export default function ListScreen() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("alphabetical");
  const [visible, setVisible] = useState(false);
  const { schedule } = useActivity();

  const filterFn = (schedule: Schedule) => {
    if (filter === "archived") return schedule.archived;
    if (filter === "completed")
      return schedule.weeklyTarget < schedule.doneThisWeek + schedule.doneToday;
    if (filter === "ongoing") return !schedule.overflowTime;
    if (filter === "overflow") return schedule.overflowTime;
    return true;
  };
  const sortFn = (a: Schedule, b: Schedule) => {
    if (sort === "alphabetical") return a.name > b.name ? 1 : -1;
    if (sort === "created") return a.createdAt - b.createdAt;
    if (sort === "updated") return a.updatedAt - b.updatedAt;
    return -1;
  };

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
        {schedule
          .filter(filterFn)
          .sort(sortFn)
          .map((item) => (
            <ActivityCard key={item.id} activity={item} />
          ))}
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
