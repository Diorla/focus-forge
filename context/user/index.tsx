import React, { useState, useEffect, useCallback } from "react";
import UserContext from "./userContext";
import { View } from "react-native";
import { logError } from "../../services/database";
import * as SplashScreen from "expo-splash-screen";
import { ToastProvider } from "react-native-toast-notifications";

SplashScreen.preventAutoHideAsync();

import { useTheme } from "@rneui/themed";
import useInterval from "../../container/Timer/useInterval";
import { createTable, insertRow, openDatabase } from "../../services/db";
import User from "../../services/db/schema/User";
import selectRow from "../../services/db/selectRow";
import { useForceUpdate } from "../activity/useForceUpdate";
import deleteRow from "../../services/db/deleteRow";
import UserModel from "../../services/db/schema/User/Model";
import updateRow from "../../services/db/updateRow";

const db = openDatabase();
export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [time, setTime] = useState(Date.now());
  const [forceUpdate, forceUpdateInfo] = useForceUpdate();
  const {
    theme: {
      colors: {
        success: successColor,
        error: dangerColor,
        warning: warningColor,
        secondary: normalColor,
      },
    },
  } = useTheme();

  useEffect(() => {
    createTable(db, User.tableName, User.getMetaData());
    selectRow({
      db,
      table: User.tableName,
      callback: (_, result) => {
        const initialUser = new User();
        const { dailyQuota: dQ, useWeeklyQuota: uWQ } = initialUser.getData();
        const { dailyQuota = dQ, useWeeklyQuota = uWQ } = result.rows._array[0];
        setUser({
          ...initialUser.getData(),
          ...result.rows._array[0],
          dailyQuota: JSON.parse(dailyQuota || "[]"),
          useWeeklyQuota: Boolean(useWeeklyQuota),
        });
        setLoading(false);
      },
      errorCallback: (error) => {
        logError("get activity", "select row", error);
        setLoading(false);
        setError(error);
      },
    });
  }, [user?.id, forceUpdateInfo]);

  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  useInterval(() => {
    setTime(Date.now());
  }, 15000);

  async function deleteUser(id: string) {
    deleteRow({
      db,
      table: User.tableName,
      id,
      callback: forceUpdate,
      errorCallback: (error) => logError("User", "delete row", error),
    });
  }

  async function createUser(task: UserModel, forceUpdate) {
    const newUser = new User(task);
    insertRow({
      db,
      table: User.tableName,
      data: newUser.getData(),
      callback: forceUpdate,
      errorCallback: (error) => logError("User", "create row", error),
    });
  }

  async function updateUser(id: string, data: Partial<UserModel>, forceUpdate) {
    const { dailyQuota, useWeeklyQuota } = data;
    updateRow({
      db,
      table: User.tableName,
      data: {
        ...data,
        dailyQuota: JSON.stringify(dailyQuota),
        useWeeklyQuota: Number(useWeeklyQuota),
        id,
      },
      callback: forceUpdate,
      errorCallback: (error) => logError("User", "update row", error),
    });
  }

  if (loading) return null;
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ToastProvider
        successColor={successColor}
        dangerColor={dangerColor}
        warningColor={warningColor}
        normalColor={normalColor}
      >
        <UserContext.Provider
          value={{
            user,
            loading,
            error,
            time,
            deleteUser,
            createUser,
            updateUser,
          }}
        >
          {children}
        </UserContext.Provider>
      </ToastProvider>
    </View>
  );
}
