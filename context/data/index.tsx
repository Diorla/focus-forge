import { useEffect, useState } from "react";
import DataContext from "./DataContext";
import getUser from "../../services/storage/getUser";
import storeUser from "../../services/storage/storeUser";
import UserModel from "./model/UserModel";
import saveUser from "../../services/storage/saveUser";
import removeUser from "../../services/storage/removeUser";
import getActivityList from "../../services/storage/getActivityList";
import saveActivity from "../../services/storage/saveActivity";
import ActivityModel from "./model/ActivityModel";
import updateActivityList from "../../services/storage/updateActivityList";
import removeActivity from "../../services/storage/removeActivity";

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activityList, setActivityList] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    getActivityList().then((list) => {
      setActivityList(list);
    });
  }, [user]);

  const createUser = (user: UserModel) => {
    storeUser(user);
    setUser(user);
  };

  const updateUser = (value: Partial<UserModel>) => {
    saveUser({ ...user, ...value }).then((user) => {
      setUser(user);
    });
  };

  const deleteUser = () => {
    removeUser().then(() => {
      setUser(null);
    });
  };

  const createActivity = (activity: ActivityModel) => {
    saveActivity(activity).then((list) => {
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
    getUser().then((user) => {
      setUser(user);
      setIsReady(true);
    });

    getActivityList().then((list) => {
      setActivityList(list);
    });
  };
  return (
    <DataContext.Provider
      value={{
        activityList,
        isReady,
        user,
        createUser,
        updateUser,
        deleteUser,
        createActivity,
        updateActivity,
        deleteActivity,
        restartDB,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
