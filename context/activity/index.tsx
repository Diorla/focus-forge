import React, { useState, useEffect } from "react";
import ActivityContext from "./activityContext";
import { Unsubscribe } from "firebase/firestore";
import dayjs from "dayjs";
import useUser from "../user/useUser";
import isToday from "dayjs/plugin/isToday";
import watchActivities from "../../services/database/watchActivity";
// missing: change createdAt to number

dayjs.extend(isToday);

export default function ActivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    try {
      unsubscribe = watchActivities(user?.id, (activities) => {
        setActivities(activities);

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
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}
