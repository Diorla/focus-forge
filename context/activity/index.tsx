import React, { useState, useEffect } from "react";
import ActivityContext from "./activityContext";
import { Unsubscribe } from "firebase/firestore";
import dayjs from "dayjs";
import useUser from "../user/useUser";
import isToday from "dayjs/plugin/isToday";
import watchActivities from "../../services/database/watchActivity";
import getTime from "./getTime";
import getSchedule from "./getSchedule";

dayjs.extend(isToday);

export default function ActivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [activities, setActivities] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    try {
      unsubscribe = watchActivities(user?.id, (activities) => {
        const time = getTime(activities, user);

        const scheduleList = getSchedule(
          activities,
          time.todayRemaining,
          time.upcomingTime
        );

        let todoTime = 0;
        let taskDone = 0;
        let taskLeft = 0;

        scheduleList.forEach((item) => {
          const { additionalTime, todayTime } = item;
          todoTime += additionalTime + todayTime;
          if (additionalTime + todayTime > 0) taskLeft++;
          if (additionalTime + todayTime <= 0) taskDone++;
        });

        setActivities(activities);
        setSchedule(scheduleList);
        setTime({ ...time, todoTime, taskDone, taskLeft });
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      setError(error);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [user?.id]);

  return (
    <ActivityContext.Provider
      value={{
        activities,
        error,
        loading,
        time,
        schedule,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}
