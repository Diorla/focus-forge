import React, { useState } from "react";
import UserContext from "./userContext";
import { ToastProvider } from "react-native-toast-notifications";
import { useTheme } from "@rneui/themed";
import useInterval from "../../container/Timer/useInterval";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [time, setTime] = useState(Date.now());
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

  useInterval(() => {
    setTime(Date.now());
  }, 15000);

  return (
    <ToastProvider
      successColor={successColor}
      dangerColor={dangerColor}
      warningColor={warningColor}
      normalColor={normalColor}
    >
      <UserContext.Provider value={{ time }}>{children}</UserContext.Provider>
    </ToastProvider>
  );
}
