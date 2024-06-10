import { useEffect, useState } from "react";
import DataContext from "./DataContext";
import getUser from "../../services/storage/getUser";
import getActivityList from "../../services/storage/getActivityList";
import saveActivity from "../../services/storage/saveActivity";
import ActivityModel from "./model/ActivityModel";
import updateActivityList from "../../services/storage/updateActivityList";
import removeActivity from "../../services/storage/removeActivity";
import { initialActivity } from "./initialActivity";
import useUser from "../user/useUser";
import useInterval from "@/hooks/useTimeInterval";

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
      setActivityList(list);
    });
  }, [user.id + user.updatedAt]);

  const createActivity = (activity: Partial<ActivityModel>) => {
    const newActivity: ActivityModel =
      activityList.find((item) => item.id === activity.id) || initialActivity;

    saveActivity({ ...newActivity, ...activity }).then((list) => {
      setActivityList(list);
    });
  };

  const updateActivity = (id: string, activity: Partial<ActivityModel>) => {
    updateActivityList(id, activity).then((list) => {
      setActivityList(list);
    });
  };

  const deleteActivity = (id: string) => {
    removeActivity(id).then((list) => {
      setActivityList(list);
    });
  };

  const restartDB = () => {
    getActivityList().then((list) => {
      setActivityList(list);
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
