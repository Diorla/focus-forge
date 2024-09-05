import { useContext } from "react";
import userContext from "./userContext";
import { UserContextType } from "./UserContextType";

export default function useUser() {
  return useContext<UserContextType>(userContext);
}
