import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import UserModel from "./UserModel";
import { initialUser } from "./initialUser";
import { onAuthStateChanged, Unsubscribe, Auth, getAuth } from "firebase/auth";
import app from "@/constants/firebaseConfig";
import { logError } from "@/services/database";
import watchUser from "@/services/database/watchUser";
import getUserCred from "@/services/database/getUserCred";
import signIn from "@/services/auth/signIn";
import { Dimensions, useColorScheme, View } from "react-native";
import * as Notifications from "expo-notifications";
import { Colors } from "@/constants/Colors";
import getMarginLeft from "./getMarginLeft";
import useNotifications from "./useNotifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const auth = getAuth(app);

const maxWidth = 720;
export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserModel>(initialUser);
  const [loading, setLoading] = useState(true);
  const [marginLeft, setMarginLeft] = useState(0);
  const [theme, setTheme] = useState(Colors.light);
  const colorScheme = useColorScheme();

  const { expoPushToken, notification } = useNotifications();

  useEffect(() => {
    const theme = user.mode ? user.mode : colorScheme;
    if (theme === "dark") setTheme(Colors.dark);
    else setTheme(Colors.light);
  }, [colorScheme, user.mode]);

  useEffect(() => {
    setMarginLeft(getMarginLeft(maxWidth));
    const subscription = Dimensions.addEventListener("change", () => {
      setMarginLeft(getMarginLeft(maxWidth));
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth as Auth, (currentUser) => {
        if (currentUser) {
          watchUser(currentUser.uid, (user) => {
            setUser({
              ...initialUser,
              ...user,
              id: currentUser.uid,
              email: currentUser.email || user.email,
            });
            setLoading(false);
          });
        } else {
          getUserCred().then((userCred) => {
            if (userCred.email) {
              signIn(userCred.email, userCred.password);
            } else {
              setUser(initialUser);
              setLoading(false);
            }
          });
        }
      });
    } catch (error) {
      logError(user?.id, "auth user context", error as Error);
      setLoading(false);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [user?.id]);

  return (
    <UserContext.Provider
      value={{ user, loading, expoPushToken, notification, theme }}
    >
      <View style={{ maxWidth, marginLeft }}>
        <View
          style={{
            minHeight: Dimensions.get("window").height,
            maxWidth: "100%",
            flex: 1,
            alignItems: "stretch",
          }}
        >
          {children}
        </View>
      </View>
    </UserContext.Provider>
  );
}
