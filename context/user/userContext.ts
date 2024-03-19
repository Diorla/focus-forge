import { createContext } from "react";

const userContext = createContext({
  time: Date.now(),
});

export default userContext;
