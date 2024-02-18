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
import { useForceUpdate } from "../useForceUpdate";
import deleteRow from "../../services/db/deleteRow";
import UserModel from "../../services/db/schema/User/Model";
import updateRow from "../../services/db/updateRow";
import getUser from "../../services/db/getUser";

const db = openDatabase();
export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserModel>(null);
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

  useEffect(() => {
    createTable(db, User.tableName, User.getMetaData());
    getUser({
      db,
      table: User.tableName,
      callback: (_, result) => {
        const { dailyQuota, useWeeklyQuota, id } = result.rows._array[0] || {};
        if (id) {
          setUser({
            ...result.rows._array[0],
            dailyQuota: JSON.parse(dailyQuota || "[]"),
            useWeeklyQuota: Boolean(useWeeklyQuota),
          });
          setLoading(false);
        } else {
          const initialUser = new User();
          const { dailyQuota, useWeeklyQuota } = initialUser.getData();
          createUser(
            {
              ...initialUser.getData(),
              dailyQuota: JSON.parse(dailyQuota || "[]"),
              useWeeklyQuota: Boolean(useWeeklyQuota),
            },
            forceUpdate
          );
        }
      },
      errorCallback: (error) => {
        logError("get activity", "select row", error);
        setLoading(false);
        setError(error);
      },
    });
  }, [forceUpdateInfo]);

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
