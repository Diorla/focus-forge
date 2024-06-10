import { createContext } from "react";
import { initialUser } from "./initialUser";
import { UserContextType } from "./UserContextType";

const userContext = createContext<UserContextType>({
  createUser: () => null,
  updateUser: () => null,
  deleteUser: () => null,
  user: initialUser,
  loading: true,
});

export default userContext;
