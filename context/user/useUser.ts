import { useContext } from "react";
import userContext from "./userContext";

export default function useUser() {
  interface UserContext {
    /**
     * The current time to the milliseconds, to keep track of the day
     */
    time: number;
  }

  return useContext<UserContext>(userContext);
}
