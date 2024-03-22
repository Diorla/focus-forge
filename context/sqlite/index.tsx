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
import ActivityModel from "./schema/Activity/Model";
import deleteRow from "./scripts/deleteRow";
import DoneModel from "./schema/Done/Model";
import TaskModel from "./schema/Task/Model";

SplashScreen.preventAutoHideAsync();

export default function SQLiteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [db, setDb] = useState<SQLite.SQLiteDatabase>(null);
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);
  const [activityList, setActivityList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [taskList, setTaskList] = useState([]);
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
      callback: setActivityList,
      errorCallback: (error) => logError(User.tableName, "get user", error),
    });
  }

  function getDone() {
    createTable(db, Done.tableName, Done.getMetaData());
    selectRows({
      db,
      table: Done.tableName,
      callback: setDoneList,
      errorCallback: (error) => logError(Done.tableName, "get user", error),
    });
  }

  function getTask() {
    createTable(db, Task.tableName, Task.getMetaData());
    selectRows({
      db,
      table: Task.tableName,
      callback: setTaskList,
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

  function createActivity(activity: ActivityModel) {
    const newActivity = new Activity(activity);
    insertRow({
      db,
      table: Activity.tableName,
      data: newActivity.getData(),
      callback: setActivityList,
      errorCallback: (error) => logError("Activity", "create row", error),
    });
  }

  function updateActivity(id: string, data: Partial<ActivityModel>) {
    updateRow({
      db,
      table: Activity.tableName,
      data: { ...data, id },
      callback: setActivityList,
      errorCallback: (error) => logError("Activity", "update row", error),
    });
  }

  function deleteActivity(id: string) {
    deleteRow({
      db,
      table: Activity.tableName,
      id,
      callback: setActivityList,
      errorCallback: (error) => logError("Activity", "delete row", error),
    });
  }

  function createDone(done: DoneModel) {
    const newDone = new Done(done);
    insertRow({
      db,
      table: Done.tableName,
      data: newDone.getData(),
      callback: setDoneList,
      errorCallback: (error) => logError("Done", "create row", error),
    });
  }

  function deleteDone(id: string) {
    deleteRow({
      db,
      table: Done.tableName,
      id,
      callback: setDoneList,
      errorCallback: (error) => logError("Done", "delete row", error),
    });
  }

  function updateDone(id: string, data: Partial<DoneModel>) {
    updateRow({
      db,
      table: Done.tableName,
      data: { ...data, id },
      callback: setDoneList,
      errorCallback: (error) => logError("Done", "update row", error),
    });
  }

  function createTask(task: TaskModel) {
    const newTask = new Task(task);
    insertRow({
      db,
      table: Task.tableName,
      data: newTask.getData(),
      callback: setTaskList,
      errorCallback: (error) => logError("Task", "create row", error),
    });
  }

  function deleteTask(id: string) {
    deleteRow({
      db,
      table: Task.tableName,
      id,
      callback: setTaskList,
      errorCallback: (error) => logError("Task", "delete row", error),
    });
  }

  function updateTask(id: string, data: Partial<TaskModel>) {
    updateRow({
      db,
      table: Task.tableName,
      data: { ...data, id },
      callback: setTaskList,
      errorCallback: (error) => logError("Task", "update row", error),
    });
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SQLiteContext.Provider
        value={{
          restartDB,
          isReady,
          user,
          activityList,
          doneList,
          taskList,
          createUser,
          updateUser,
          deleteUser,
          createActivity,
          updateActivity,
          deleteActivity,
          updateDone,
          createDone,
          deleteDone,
          updateTask,
          createTask,
          deleteTask,
        }}
      >
        {children}
      </SQLiteContext.Provider>
    </View>
  );
}
