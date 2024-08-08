import React, { useState, useEffect, useCallback } from "react";
import ActivityContext from "./scheduleContext";
import dayjs from "dayjs";
import useUser from "../user/useUser";
import isToday from "dayjs/plugin/isToday";
import Schedule from "./Schedule";
import useDataQuery from "../data/useDataQuery";
import Checklist from "./Checklist";
import getChecklist from "./getChecklist";
import { logError } from "@/services/database";
import PageLoader from "@/components/PageLoader";
import { AppState } from "react-native";
import filterChecklist from "./filterChecklist";
import generateSchedule from "./generateSchedule";
import initialTime from "./initialTime";

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

  const [time, setTime] = useState(initialTime);

  // Determine if new stuff is created
  const activityListString = JSON.stringify(activityList);

  const refresh = useCallback(() => {
    try {
      setPrevTime(userTime);
      const { scheduleList, todoTime, taskDone, taskLeft, doneToday } =
        generateSchedule(activityList, user);
      setSchedule(scheduleList);
      setTime({ todoTime, taskDone, taskLeft, doneToday });
      setChecklist(getChecklist(activityList.filter(filterChecklist)));
      setLoading(false);
    } catch (error) {
      logError(activityListString, "use effect", error as Error);
    }
  }, [activityList, activityListString, user, userTime]);

  // Check if it's a new day since last update
  useEffect(() => {
    if (!dayjs(prevTime).isSame(userTime, "date")) {
      refresh();
    }
  }, [prevTime, userTime, activityList, user, refresh]);

  useEffect(() => {
    refresh();
  }, [activityListString, activityList, user, userTime, refresh]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        refresh();
      }
    });
    return () => subscription.remove();
  }, [activityList, activityList.length, refresh, user, userTime]);

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
