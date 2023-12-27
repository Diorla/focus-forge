import { createContext } from "react";

const activityContext = createContext({
  activities: [],
  loading: true,
  error: null,
});

export default activityContext;
