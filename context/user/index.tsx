import React, { useState, useEffect, useCallback } from "react";
import {
  onAuthStateChanged,
  Unsubscribe,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import UserContext from "./userContext";
import { View } from "react-native";
import app from "../../constants/firebaseConfig";
import { logError, watchUser } from "../../services/database";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const signOut = () => {
    signOut();
    setUser(null);
  };

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          watchUser(currentUser.uid, (dbUser) => {
            const email = dbUser?.email || currentUser.email;
            const name = dbUser?.name || currentUser.displayName;
            setUser({
              email,
              name,
              id: currentUser.uid,
              ...dbUser,
            });
            setLoading(false);
          });
        } else {
          setUser(null);
          setLoading(false);
        }
      });
    } catch (error) {
      setError(error);
      logError(user?.id, "auth user context", error);
      setLoading(false);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [user?.id]);

  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) return null;
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <UserContext.Provider
        value={{
          user,
          loading,
          signOut,
          error,
        }}
      >
        {children}
      </UserContext.Provider>
    </View>
  );
}
