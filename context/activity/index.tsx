import React, { useState, useEffect } from "react";
import ActivityContext from "./activityContext";
import dayjs from "dayjs";
import useUser from "../user/useUser";
import isToday from "dayjs/plugin/isToday";
import getTime from "./getTime";
import getSchedule from "./getSchedule";
import selectRow from "../../services/db/selectRow";
import { createTable, insertRow, openDatabase } from "../../services/db";
import ActivityModel from "../../services/db/schema/Activity/Model";
import Activity from "../../services/db/schema/Activity";
import Done from "../../services/db/schema/Done";
import Task from "../../services/db/schema/Task";
import deleteRow from "../../services/db/deleteRow";
import updateRow from "../../services/db/updateRow";
import { useForceUpdate } from "./useForceUpdate";
import { logError } from "../../services/database";

dayjs.extend(isToday);

const db = openDatabase();

export default function ActivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, time: userTime } = useUser();
  const [prevTime, setPrevTime] = useState(userTime);
  const [activities, setActivities] = useState([]);
  const [done, setDone] = useState([]);
  const [tasks, setTasks] = useState([]);
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

  const [forceUpdate, forceUpdateInfo] = useForceUpdate();
  function loadActivity() {
    const time = getTime(activities, done, user);

    const scheduleList = getSchedule({
      activities,
      initialTodayRemaining: time.todayRemaining,
      initialUpcomingTime: time.upcomingTime,
      done,
      tasks,
    });

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

    setSchedule(scheduleList);
    setTime({ ...time, todoTime, taskDone, taskLeft });
    setPrevTime(userTime);
    setLoading(false);
  }

  // Check if it's a new day since last update
  useEffect(() => {
    if (!dayjs(prevTime).isSame(userTime, "date")) {
      loadActivity();
    }
  }, [userTime]);

  useEffect(() => {
    try {
      createTable(db, Activity.tableName, Activity.getMetaData());
      createTable(db, Done.tableName, Done.getMetaData());
      createTable(db, Task.tableName, Task.getMetaData());
      selectRow({
        db,
        table: Activity.tableName,
        callback: (_, result) => {
          setActivities(result.rows._array);
        },
        errorCallback: (error) => logError("get activity", "select row", error),
      });
      selectRow({
        db,
        table: Done.tableName,
        callback: (_, result) => {
          setDone(result.rows._array);
        },
        errorCallback: (error) => logError("get Done", "select row", error),
      });
      selectRow({
        db,
        table: Task.tableName,
        callback: (_, result) => {
          setTasks(result.rows._array);
        },
        errorCallback: (error) => logError("get Task", "select row", error),
      });
    } catch (error) {
      setError(error);
      logError("initial load", "loading activity", error);
    }
  }, [forceUpdateInfo]);

  useEffect(() => {
    loadActivity();
  }, [activities.length, done.length, tasks.length]);

  function updateActivity(id: string, data: Partial<ActivityModel>) {
    updateRow({
      db,
      table: Activity.tableName,
      data: { ...data, id },
      callback: forceUpdate,
      errorCallback: (error) => logError("Activity", "update row", error),
    });
  }

  async function createActivity(activity: ActivityModel) {
    const newActivity = new Activity(activity);
    insertRow({
      db,
      table: Activity.tableName,
      data: newActivity.getData(),
      callback: forceUpdate,
      errorCallback: (error) => logError("Activity", "create row", error),
    });
  }

  function deleteActivity(id: string) {
    deleteRow({
      db,
      table: Activity.tableName,
      id,
      callback: forceUpdate,
      errorCallback: (error) => logError("Activity", "delete row", error),
    });
  }

  return (
    <ActivityContext.Provider
      value={{
        activities,
        error,
        loading,
        time,
        schedule,
        updateActivity,
        createActivity,
        deleteActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}
