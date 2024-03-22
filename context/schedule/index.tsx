import React, { useState, useEffect } from "react";
import ActivityContext from "./scheduleContext";
import dayjs from "dayjs";
import useUser from "../user/useUser";
import isToday from "dayjs/plugin/isToday";
import getTime from "./getTime";
import getSchedule from "./getSchedule";
import Schedule from "./Schedule";
import useSQLiteQuery from "../sqlite/useSQLiteQuery";
import { Typography } from "../../components";

dayjs.extend(isToday);

export default function ScheduleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, activityList, doneList, taskList } = useSQLiteQuery();
  const { time: userTime } = useUser();
  const [prevTime, setPrevTime] = useState(userTime);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  const [time, setTime] = useState({
    doneThisWeek: 0,
    doneToday: 0,
    thisWeekRemaining: 0,
    todayRemaining: 0,
    weeklyQuota: 0,
    daysRemaining: 0,
    todayQuota: 0,
    leftover: 0,
    todayTime: 0,
    upcomingTime: 0,
    todoTime: 0,
    taskDone: 0,
    taskLeft: 0,
  });

  // Determine if new stuff is created
  const doneListString = JSON.stringify(doneList);
  const activityListString = JSON.stringify(activityList);
  const taskListString = JSON.stringify(taskList);

  function generateSchedule() {
    const time = getTime(activityList, doneList, user);

    const scheduleList = getSchedule({
      activities: activityList,
      initialTodayRemaining: time.todayRemaining,
      initialUpcomingTime: time.upcomingTime,
      done: doneList,
      tasks: taskList,
    });

    let todoTime = 0;
    let taskDone = 0;
    let taskLeft = 0;

    scheduleList?.forEach((item) => {
      const { todayTime, doneToday } = item;
      todoTime += todayTime - doneToday;
      const timeLeft = todayTime - doneToday;
      // TODO: Fix precision floating calculation with decimal.js
      if (todayTime && timeLeft > 0.0001) taskLeft++;
      if (todayTime && timeLeft <= 0.0001) taskDone++;
    });

    setSchedule(scheduleList);
    setTime({ ...time, todoTime, taskDone, taskLeft });
    setPrevTime(userTime);
    setLoading(false);
  }

  // Check if it's a new day since last update
  useEffect(() => {
    if (!dayjs(prevTime).isSame(userTime, "date")) {
      generateSchedule();
    }
  }, [userTime]);

  useEffect(() => {
    generateSchedule();
  }, [doneListString, activityListString, taskListString]);

  if (loading) return <Typography>Loading...</Typography>;
  return (
    <ActivityContext.Provider
      value={{
        loading,
        time,
        schedule,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}
