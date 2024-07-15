import { createContext } from "react";
import { initialUser } from "./initialUser";
import { UserContextType } from "./UserContextType";
import { Colors } from "@/constants/Colors";

const userContext = createContext<UserContextType>({
  user: initialUser,
  loading: true,
  notification: undefined,
  expoPushToken: "",
  theme: Colors.light,
});

export default userContext;
