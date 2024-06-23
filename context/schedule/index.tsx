import React, { useState, useEffect } from "react";
import ActivityContext from "./scheduleContext";
import dayjs from "dayjs";
import useUser from "../user/useUser";
import isToday from "dayjs/plugin/isToday";
import getTime from "./getTime";
import getSchedule from "./getSchedule";
import Schedule from "./Schedule";

import useDataQuery from "../data/useDataQuery";
import Checklist from "./Checklist";
import getChecklist from "./getChecklist";
import { logError } from "@/services/database";
import PageLoader from "@/components/PageLoader";

dayjs.extend(isToday);

export default function ScheduleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { activityList, time: userTime } = useDataQuery();
  const { user } = useUser();
  const [prevTime, setPrevTime] = useState(userTime);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [checklist, setChecklist] = useState<Checklist[]>([]);
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
  // const doneListString = JSON.stringify(doneList);
  const activityListString = JSON.stringify(activityList);

  function generateChecklist() {
    const checklist = activityList.filter((item) => item.isOccurrence);
    if (!checklist.length) return null;
    setChecklist(getChecklist(checklist));
  }
  function generateSchedule() {
    const scheduledActivityList = activityList.filter(
      (item) => !item.isOccurrence
    );

    if (!scheduledActivityList.length) {
      setLoading(false);
      return null;
    }
    const time = getTime(scheduledActivityList, user);

    const scheduleList = getSchedule({
      activities: scheduledActivityList,
      initialTodayRemaining: time.todayRemaining,
      initialUpcomingTime: time.upcomingTime,
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
      generateChecklist();
    }
  }, [userTime]);

  useEffect(() => {
    try {
      generateSchedule();
      generateChecklist();
    } catch (error) {
      logError(String(activityList.length), "use effect", error as Error);
    }
  }, [activityListString]);

  if (loading) return <PageLoader />;
  return (
    <ActivityContext.Provider
      value={{
        loading,
        time,
        schedule,
        checklist,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}
