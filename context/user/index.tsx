import React, { useState } from "react";
import UserContext from "./userContext";
import useInterval from "../../container/Timer/useInterval";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [time, setTime] = useState(Date.now());

  useInterval(() => {
    setTime(Date.now());
  }, 15000);

  return (
    <UserContext.Provider value={{ time }}>{children}</UserContext.Provider>
  );
}
