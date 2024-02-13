import React, { useState, useEffect } from "react";
import ActivityContext from "./activityContext";
import dayjs from "dayjs";
import useUser from "../user/useUser";
import isToday from "dayjs/plugin/isToday";
import getTime from "./getTime";
import getSchedule from "./getSchedule";
import Activity from "../../models/Activity";
import { getActivity, logError, storeActivity } from "../../services/storage";
import deleteAct from "./deleteActivity";

dayjs.extend(isToday);

export default function ActivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, time: userTime } = useUser();
  const [prevTime, setPrevTime] = useState(userTime);
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

  function loadActivity(activities: Activity[]) {
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
      const { todayTime, doneToday } = item;
      todoTime += todayTime - doneToday;
      const timeLeft = todayTime - doneToday;
      // TODO: Fix precision floating calculation with decimal.js
      if (todayTime && timeLeft > 0.0001) taskLeft++;
      if (todayTime && timeLeft <= 0.0001) taskDone++;
    });

    setActivities(activities);
    setSchedule(scheduleList);
    setTime({ ...time, todoTime, taskDone, taskLeft });
    setPrevTime(userTime);
    setLoading(false);
  }

  // Check if it's a new day since last update
  useEffect(() => {
    if (!dayjs(prevTime).isSame(userTime, "date")) {
      loadActivity(activities);
    }
  }, [userTime]);

  useEffect(() => {
    try {
      getActivity().then((activities) => loadActivity(activities));
    } catch (error) {
      logError("loading activity in context", error);
      setError(error);
    }
  }, [user?.id]);

  const updateActivity = (activityId: string, value: Partial<Activity>) => {
    try {
      const activity = activities.find((item) => item.id);
      return storeActivity(activityId, { ...activity, ...value }).then(
        (activities) => loadActivity(activities)
      );
    } catch (error) {
      logError("updating activity in context", error);
    }
  };

  const deleteActivity = async (id: string) => {
    await deleteAct(id);
    const activities = await getActivity();
    return loadActivity(activities);
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        error,
        loading,
        time,
        schedule,
        updateActivity,
        deleteActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}
