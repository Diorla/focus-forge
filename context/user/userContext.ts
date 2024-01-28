import { createContext } from "react";

const userContext = createContext({
  user: null,
  loading: true,
  signOut: null,
  error: null,
  time: Date.now(),
});

export default userContext;
