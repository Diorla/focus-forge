import { createContext } from "react";

const userContext = createContext({
  user: null,
  loading: true,
  signOut: null,
  error: null,
});

export default userContext;
