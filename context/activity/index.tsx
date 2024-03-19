import React, { useState, useEffect } from "react";
import ActivityContext from "./activityContext";
import dayjs from "dayjs";
import useUser from "../user/useUser";
import isToday from "dayjs/plugin/isToday";
import getTime from "./getTime";
import getSchedule from "./getSchedule";
import ActivityModel from "../../services/db/schema/Activity/Model";
import { useForceUpdate } from "../useForceUpdate";
import { logError } from "../../services/database";
import updateActivity from "./updateActivity";
import createActivity from "./createActivity";
import deleteActivity from "./deleteActivity";
import initTable from "./initTable";
import fetchInfo from "./fetchInfo";
import updateDone from "./updateDone";
import DoneModel from "../../services/db/schema/Done/Model";
import createDone from "./createDone";
import deleteDone from "./deleteDone";
import updateTask from "./updateTask";
import createTask from "./createTask";
import deleteTask from "./deleteTask";
import TaskModel from "../../services/db/schema/Task/Model";
import Schedule from "./Schedule";
import useSQLiteQuery from "../sqlite/useSQLiteQuery";

dayjs.extend(isToday);

export default function ActivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSQLiteQuery();
  const { time: userTime } = useUser();
  const [prevTime, setPrevTime] = useState(userTime);
  const [activities, setActivities] = useState([]);
  const [done, setDone] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
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

  // Determine if new stuff is created
  const doneString = JSON.stringify(done);
  const activitiesString = JSON.stringify(activities);
  const tasksString = JSON.stringify(tasks);

  function generateSchedule() {
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
      generateSchedule();
    }
  }, [userTime]);

  useEffect(() => {
    try {
      initTable();
      fetchInfo(setActivities, setDone, setTasks);
    } catch (error) {
      setError(error);
      logError("initial load", "loading activity", error);
    }
  }, [forceUpdateInfo]);

  useEffect(() => {
    generateSchedule();
  }, [doneString, activitiesString, tasksString]);

  return (
    <ActivityContext.Provider
      value={{
        activities,
        error,
        loading,
        time,
        schedule,
        updateActivity: (id: string, data: Partial<ActivityModel>) =>
          updateActivity(id, data, forceUpdate),
        createActivity: (activity: ActivityModel) =>
          createActivity(activity, forceUpdate),
        deleteActivity: (id: string) => deleteActivity(id, forceUpdate),
        updateDone: (id: string, data: Partial<DoneModel>) =>
          updateDone(id, data, forceUpdate),
        createDone: (activity: DoneModel) => createDone(activity, forceUpdate),
        deleteDone: (id: string) => deleteDone(id, forceUpdate),
        updateTask: (id: string, data: Partial<TaskModel>) =>
          updateTask(id, data, forceUpdate),
        createTask: (activity: TaskModel) => createTask(activity, forceUpdate),
        deleteTask: (id: string) => deleteTask(id, forceUpdate),
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}
