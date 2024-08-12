import { useEffect, useState } from "react";
import DataContext from "./DataContext";
import ActivityModel from "./model/ActivityModel";
import useInterval from "@/hooks/useTimeInterval";
import useUser from "../user/useUser";
import watchActivityList from "@/services/database/watchActivityList";
import fixActivity from "./fixActivity";

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
    if (!user.id) return;

    watchActivityList(user.id, (list) => {
      const updatedList = list.map(fixActivity);
      setActivityList(updatedList);
    });
  }, [user.id]);

  return (
    <DataContext.Provider value={{ activityList, time }}>
      {children}
    </DataContext.Provider>
  );
}
