import * as React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import TopSpace from "../../components/topSpace";
import TabHeader from "../../container/Nav/TabHeader";
import { useTheme } from "@rneui/themed";
import HistoryItem from "./HistoryItem";
import useActivity from "../../context/activity/useActivity";
import { useEffect, useState } from "react";
import { format, getDateKey, secondsToHrMm } from "../../services/datetime";
import dayjs from "dayjs";

const timeFormat = (value: number) => String(value).padStart(2, "0");
// TODO: Use sectionList
export default function HistoryScreen() {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { schedule } = useActivity();
  const [history, setHistory] = useState({});
  const obj = {};
  schedule?.forEach((item) => {
    obj[item.id] = item.name;
  });

  useEffect(() => {
    const history = {};
    schedule?.forEach((item) => {
      const { done } = item;
      done?.forEach((item) => {
        const date = getDateKey(item.datetime);
        const length = item.length;
        const [hr, mm, ss] = secondsToHrMm(length);
        const comment = item.comment;
        const description = comment
          ? `${comment || ""}
          ${timeFormat(hr)}:${timeFormat(mm)}:${timeFormat(ss)}`
          : `\t  ${timeFormat(hr)}:${timeFormat(mm)}:${timeFormat(ss)}`;
        if (history[date]) {
          history[date].push({
            time: format(item.datetime, "time"),
            title: obj[item.activityId],
            description,
            length,
            datetime: item,
          });
        } else {
          history[date] = [
            {
              time: format(item.datetime, "time"),
              title: obj[item.activityId],
              description,
              length,
              datetime: item,
            },
          ];
        }
      });
    });

    setHistory(history);
    setLoading(false);
  }, []);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  return (
    <View style={{ flex: 1 }}>
      <TopSpace />
      <TabHeader />
      <ScrollView>
        {Object.keys(history)
          ?.sort((a, b) => dayjs(b).valueOf() - dayjs(a).valueOf())
          .map((item) => (
            <HistoryItem
              data={history[item]?.sort(
                (a: { datetime: string }, b: { datetime: string }) =>
                  dayjs(b.datetime).valueOf() - dayjs(a.datetime).valueOf()
              )}
              key={item}
              date={format(item, "date")}
            />
          ))}
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
