import { useCallback, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { logError } from "../../services/database";
import SQLiteContext from "./SQLiteContext";
import createTable from "./scripts/createTable";
import User from "./schema/User";
import selectUser from "./scripts/selectUser";
import Activity from "./schema/Activity";
import selectRows from "./scripts/selectRows";
import Done from "./schema/Done";
import Task from "./schema/Task";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import insertRow from "./scripts/insertRow";
import updateRow from "./scripts/updateRow";
import UserModel from "./schema/User/Model";

SplashScreen.preventAutoHideAsync();

export default function SQLiteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [db, setDb] = useState<SQLite.SQLiteDatabase>(null);
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState([]);
  const [done, setDone] = useState([]);
  const [task, setTask] = useState([]);
  // const [forceUpdate, setForceUpdate] = useState(0);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  useEffect(() => {
    const db = SQLite.openDatabase("db.db");
    setDb(db);
  }, []);

  function restartDB() {
    try {
      db.closeAsync().then(() => {
        const db = SQLite.openDatabase("db.db");
        setDb(db);
        setIsReady(true);
      });
    } catch (error) {
      logError("", "restart DB", error);
    }
  }

  function getUser() {
    createTable(db, User.tableName, User.getMetaData());
    selectUser(db, setUser, (error) =>
      logError(User.tableName, "get user", error)
    );
  }

  function getActivity() {
    createTable(db, Activity.tableName, Activity.getMetaData());
    selectRows({
      db,
      table: Activity.tableName,
      callback: setActivity,
      errorCallback: (error) => logError(User.tableName, "get user", error),
    });
  }

  function getDone() {
    createTable(db, Done.tableName, Done.getMetaData());
    selectRows({
      db,
      table: Done.tableName,
      callback: setDone,
      errorCallback: (error) => logError(Done.tableName, "get user", error),
    });
  }

  function getTask() {
    createTable(db, Task.tableName, Task.getMetaData());
    selectRows({
      db,
      table: Task.tableName,
      callback: setTask,
      errorCallback: (error) => logError(Task.tableName, "get user", error),
    });
  }

  useEffect(() => {
    if (db) {
      getUser();
      getActivity();
      getDone();
      getTask();
      setIsReady(true);
    }
  }, [db]);

  async function createUser() {
    const initialUser = new User();
    const { dailyQuota, useWeeklyQuota } = initialUser.getData();
    insertRow({
      db,
      table: User.tableName,
      data: {
        ...initialUser.getData(),
        dailyQuota: JSON.parse(dailyQuota || "[]"),
        useWeeklyQuota: useWeeklyQuota,
      },
      callback: setUser,
      errorCallback: (error) => logError(User.tableName, "create user", error),
    });
  }

  async function updateUser(data: Partial<UserModel>) {
    const { dailyQuota, useWeeklyQuota } = data;
    updateRow({
      db,
      table: User.tableName,
      data: {
        ...data,
        dailyQuota: JSON.stringify(dailyQuota),
        useWeeklyQuota: Number(useWeeklyQuota),
        id: User.tableName,
      },
      callback: setUser,
      errorCallback: (error) => logError("User", "update user", error),
    });
  }

  async function deleteUser() {
    db.closeAsync().then(() => db.deleteAsync());
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SQLiteContext.Provider
        value={{
          restartDB,
          isReady,
          user,
          activity,
          done,
          task,
          createUser,
          updateUser,
          deleteUser,
        }}
      >
        {children}
      </SQLiteContext.Provider>
    </View>
  );
}
