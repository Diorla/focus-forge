import { useEffect, useState } from "react";
import DataContext from "./DataContext";
import ActivityModel from "./model/ActivityModel";
import { initialActivity } from "./initialActivity";
import useInterval from "@/hooks/useTimeInterval";
import getActivityList from "@/services/storage/getActivityList";
import removeActivity from "@/services/storage/removeActivity";
import saveActivity from "@/services/storage/saveActivity";
import updateActivityList from "@/services/storage/updateActivityList";
import useUser from "../user/useUser";

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activityList, setActivityList] = useState<ActivityModel[]>([]);

  const { user } = useUser();
  const [time, setTime] = useState(Date.now());
  useInterval(() => {
    setTime(Date.now());
  }, 15000);

  useEffect(() => {
    getActivityList().then((list) => {
      setActivityList(list.filter((item) => !item.deletedAt));
    });
  }, [user.id + user.updatedAt]);

  const createActivity = (activity: Partial<ActivityModel>) => {
    const newActivity: ActivityModel =
      activityList.find((item) => item.id === activity.id) || initialActivity;

    saveActivity({ ...newActivity, ...activity }).then((list) => {
      setActivityList(list.filter((item) => !item.deletedAt));
    });
  };

  const updateActivity = (id: string, activity: Partial<ActivityModel>) => {
    updateActivityList(id, activity).then((list) => {
      setActivityList(list.filter((item) => !item.deletedAt));
    });
  };

  const deleteActivity = (id: string) => {
    removeActivity(id).then((list) => {
      setActivityList(list.filter((item) => !item.deletedAt));
    });
  };

  const restartDB = () => {
    getActivityList().then((list) => {
      setActivityList(list.filter((item) => !item.deletedAt));
    });
  };

  return (
    <DataContext.Provider
      value={{
        activityList,
        createActivity,
        updateActivity,
        deleteActivity,
        restartDB,
        time,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
