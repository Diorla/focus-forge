import { useContext } from "react";
import userContext from "./userContext";
import User from "../../models/User";

export default function useUser() {
  interface UserContext {
    /**
     * All the user information
     */
    user: User;
    /**
     * If the user information is loading
     */
    loading: boolean;
    /**
     * All the tasks of the user
     */

    signOut: () => void;
    /**
     * If there is an error
     */
    error: Error;
    /**
     * The current time to the milliseconds, to keep track of the day
     */
    time: number;
  }

  return useContext<UserContext>(userContext);
}
