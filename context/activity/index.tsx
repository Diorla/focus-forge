import React, { useState, useEffect } from "react";
import ActivityContext from "./activityContext";
import dayjs from "dayjs";
import useUser from "../user/useUser";
import isToday from "dayjs/plugin/isToday";
import getTime from "./getTime";
import getSchedule from "./getSchedule";
import selectRow from "../../services/db/selectRow";
import { createTable, openDatabase } from "../../services/db";
import ActivityModel from "../../services/db/schema/Activity/Model";
import DoneModel from "../../services/db/schema/Done/Model";
import TaskModel from "../../services/db/schema/Task/Model";
import Activity from "../../services/db/schema/Activity";
import Done from "../../services/db/schema/Done";
import Task from "../../services/db/schema/Task";

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

  function loadActivity(
    activities: ActivityModel[],
    done: DoneModel[],
    tasks: TaskModel[]
  ) {
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

    setActivities(activities);
    setSchedule(scheduleList);
    setTime({ ...time, todoTime, taskDone, taskLeft });
    setPrevTime(userTime);
    setDone(done);
    setTasks(tasks);
    setLoading(false);
  }

  useEffect(() => {
    createTable(db, Activity.tableName, Activity.getMetaData());
    createTable(db, Done.tableName, Done.getMetaData());
    createTable(db, Task.tableName, Task.getMetaData());
  }, []);

  // Check if it's a new day since last update
  useEffect(() => {
    if (!dayjs(prevTime).isSame(userTime, "date")) {
      loadActivity(activities, done, tasks);
    }
  }, [userTime]);

  useEffect(() => {
    try {
      const activities = [];
      const done = [];
      const tasks = [];
      selectRow({
        db,
        table: "activities",
        callback: (_, result) => {
          activities.push(...result.rows._array);
        },
      });
      selectRow({
        db,
        table: "done",
        callback: (_, result) => {
          done.push(...result.rows._array);
        },
      });
      selectRow({
        db,
        table: "tasks",
        callback: (_, result) => {
          tasks.push(...result.rows._array);
        },
      });
      loadActivity(activities, done, tasks);
    } catch (error) {
      setError(error);
    }
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
