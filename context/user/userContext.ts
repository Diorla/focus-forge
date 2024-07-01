import { createContext } from "react";
import { initialUser } from "./initialUser";
import { UserContextType } from "./UserContextType";

const userContext = createContext<UserContextType>({
  user: initialUser,
  loading: true,
  notification: undefined,
  expoPushToken: "",
});

export default userContext;
