import { useContext } from "react";
import userContext from "./userContext";
import User from "../../models/User";
import UserModel from "../../services/db/schema/User/Model";

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
     * If there is an error
     */
    error: Error;
    /**
     * The current time to the milliseconds, to keep track of the day
     */
    time: number;
    updateUser: (id: string, data: Partial<UserModel>) => Promise<void>;
    createUser: (activities: UserModel) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
  }

  return useContext<UserContext>(userContext);
}
