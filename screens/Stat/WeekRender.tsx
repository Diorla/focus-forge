import * as React from "react";
import { View } from "react-native";
import { Button, TimeFormat, Typography } from "../../components";
import { Card, Icon, useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import useSchedule from "../../context/schedule/useSchedule";
import relativeWeek from "./relativeWeek";
import StatItem from "./StatItem";
import calculatePercentageChange from "./calculatePercentageChange";
import Schedule from "../../context/schedule/Schedule";

const calculateDoneTime = (schedule: Schedule, date: Dayjs) => {
  const { done } = schedule;
  const total = Object.keys(done)
    .filter((item) => dayjs(date).isSame(item, "week"))
    .map((item) => done[item].length)
    .reduce((prev, curr) => prev + curr, 0);
  return total;
};

interface Stat {
  id: string;
  name: string;
  time: number;
}
export default function WeekRender() {
  const [weekDifference, setWeekDifference] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const [maxActivity, setMaxActivity] = useState(0);
  const [dailyAvg, setDailyAvg] = useState(0);
  const [prevDailyAvg, setPrevDailyAvg] = useState(0);
  const [showActivity, setShowActivity] = useState(true);
  const [targetWeekActivityList, setTargetWeekActivityList] = useState<Stat[]>(
    []
  );
  const [targetWeekCategoryList, setTargetWeekCategoryList] = useState<Stat[]>(
    []
  );
  const { schedule } = useSchedule();

  const target = dayjs().add(weekDifference, "week");
  const title = relativeWeek(target);
  const {
    theme: { colors },
  } = useTheme();

  useEffect(() => {
    let maxAct = 0;
    let totalAct = 0;
    let prevMaxAct = 0;
    let prevTotalAct = 0;
    const category = {};
    const prevCategory = {};
    const activityList: Stat[] = [];
    const prevActivityList: Stat[] = [];
    schedule?.forEach((item) => {
      const total = calculateDoneTime(item, target);
      const prevTotal = calculateDoneTime(
        item,
        dayjs(target).subtract(1, "week")
      );
      totalAct += total;
      prevTotalAct += prevTotal;
      if (maxAct < total) maxAct = total;
      if (prevMaxAct < prevTotal) prevMaxAct = prevTotal;
      if (total)
        activityList.push({
          id: item.id,
          time: total,
          name: item.name,
        });
      if (prevTotal)
        prevActivityList.push({
          id: item.id,
          time: prevTotal,
          name: item.name,
        });

      const targetCategory = item.category || "None";
      if (category[targetCategory]) {
        category[targetCategory] += total;
        prevCategory[targetCategory] += prevTotal;
      } else {
        if (total) category[targetCategory] = total;
        if (prevTotal) prevCategory[targetCategory] = prevTotal;
      }
    });

    const days = dayjs().isSame(target, "week") ? dayjs().day() + 1 : 7;
    const prevDays = dayjs().isSame(dayjs(target).subtract(1, "week"), "week")
      ? dayjs().day() + 1
      : 7;
    const categoryList: Stat[] = Object.keys(category).map((item) => {
      return {
        id: item,
        name: item,
        time: category[item],
      };
    });

    setMaxActivity(maxAct);
    setDailyAvg(totalAct / days);
    setPrevDailyAvg(prevTotalAct / prevDays);
    setTargetWeekActivityList(activityList);
    setTargetWeekCategoryList(categoryList);
  }, [dayjs(target).format("YYYY-MM-DD")]);

  const list = showActivity ? targetWeekActivityList : targetWeekCategoryList;
  const max = maxActivity;
  const { percentageChange, direction } = calculatePercentageChange(
    prevDailyAvg,
    dailyAvg
  );

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 8,
          marginVertical: 4,
        }}
      >
        <Icon
          onPress={() => setWeekDifference(weekDifference - 1)}
          name="chevron-with-circle-left"
          type="entypo"
          size={36}
          color={colors.primary}
        />
        <Typography style={{ flex: 1, textAlign: "center" }}>
          {title}
        </Typography>
        <Icon
          onPress={() => setWeekDifference(weekDifference + 1)}
          name="chevron-with-circle-right"
          type="entypo"
          size={36}
          color={colors.primary}
        />
      </View>

      <Card>
        <Typography type="label">Daily Average</Typography>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <TimeFormat value={dailyAvg} type="bigHeader" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Icon
              size={16}
              name={`arrow-with-circle-${direction}`}
              type="entypo"
            />
            <Typography type="small">
              {" "}
              {percentageChange}% from last week
            </Typography>
          </View>
        </View>
        {/* <View>
          <Typography>Daily stacked chart based on priority</Typography>
        </View> */}
      </Card>
      <Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setViewWidth(width);
          }}
        >
          <Typography type="label">
            {showActivity ? "ACTIVITIES" : "CATEGORIES"}
          </Typography>
          <Button onPress={() => setShowActivity(!showActivity)}>
            {showActivity ? "SHOW CATEGORIES" : "SHOW ACTIVITIES"}
          </Button>
        </View>
        {list
          ?.sort((prev, next) => {
            return next.time - prev.time;
          })
          .map((item) => (
            <StatItem
              key={item.id}
              width={viewWidth - 50}
              title={item.name}
              ratio={max ? item.time / max : 0}
              time={item.time}
            />
          ))}
      </Card>
    </View>
  );
}
