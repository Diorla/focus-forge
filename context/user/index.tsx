import React, { useEffect, useState, useRef } from "react";
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
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Colors } from "@/constants/Colors";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function handleRegistrationError(errorMessage: string) {
  const newError = new Error(errorMessage);
  logError("no id", errorMessage, newError);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "web") return;
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: Colors.light.primary,
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

const auth = getAuth(app);

const maxWidth = 720;
const getMarginLeft = (width: number) => {
  const left = (Dimensions.get("window").width - width) / 2;
  if (left < 0) return 0;
  return left;
};
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

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    const theme = user.mode ? user.mode : colorScheme;
    if (theme === "dark") setTheme(Colors.dark);
    else setTheme(Colors.light);
    return () => {};
  }, [colorScheme, user.mode]);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
