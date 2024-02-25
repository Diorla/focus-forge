import { createContext } from "react";

const userContext = createContext({
  user: null,
  loading: true,
  error: null,
  time: Date.now(),
  updateUser: null,
  createUser: null,
  deleteUser: null,
});

export default userContext;
