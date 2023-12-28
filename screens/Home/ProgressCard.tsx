import { View } from "react-native";
import { Typography } from "../../components";
import { Card, Divider, useTheme } from "@rneui/themed";
import * as Progress from "react-native-progress";
import useActivity from "../../context/activity/useActivity";
import secondsToHrMm from "../../services/date/minutesToHrMm";
import { useEffect, useState } from "react";

export default function ProgressCard() {
  const {
    theme: { colors },
  } = useTheme();
  const {
    time: { doneToday, upcomingTime },
    schedule,
  } = useActivity();

  const [timing, setTiming] = useState({
    timeDone: 0,
    todoTime: 0,
    taskDone: 0,
    taskLeft: 0,
  });

  useEffect(() => {
    let timeDone = 0;
    let todoTime = 0;
    let taskDone = 0;
    let taskLeft = 0;

    schedule.forEach((item) => {
      timeDone += item.doneToday;
      todoTime += item.additionalTime + item.todayRemaining;
      if (item.todayRemaining + item.additionalTime > 0) taskLeft++;
      if (item.todayRemaining + item.thisWeekRemaining < 0) taskDone++;
    });

    setTiming({
      timeDone,
      todoTime,
      taskDone,
      taskLeft,
    });
  }, []);

  const { timeDone, todoTime, taskDone, taskLeft } = timing;

  const ratio = timeDone / (timeDone + todoTime);
  const progress = Number.isNaN(ratio) ? 0 : ratio;

  const [hr, mm] = secondsToHrMm(todoTime);
  return (
    <Card
      containerStyle={{
        backgroundColor: colors.primary,
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Progress.Circle
          size={100}
          progress={progress}
          color={colors.grey5}
          unfilledColor={colors.grey0}
          borderColor={colors.grey0}
          showsText
          thickness={9}
          formatText={() => progress * 100 + "%"}
        />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Typography type="header" color={colors.white}>
            Progress
          </Typography>
          <Divider style={{ marginVertical: 10 }} />
          <Typography color={colors.white}>
            {taskDone}/{taskDone + taskLeft} activities completed
          </Typography>
          <Typography color={colors.white}>
            {hr}h {mm} remaining
          </Typography>
        </View>
      </View>
    </Card>
  );
}
