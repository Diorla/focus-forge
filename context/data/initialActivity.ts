import ActivityModel from "./model/ActivityModel";

export const initialActivity: ActivityModel = {
  id: "",
  name: "",
  weeklyTarget: 0,
  dailyLimit: 0,
  startDate: 0,
  priority: 0,
  description: "",
  color: "",
  category: "",
  archived: 0,
  updatedAt: 0,
  createdAt: 0,
  timerStart: 0,
  timerLength: 0,
  timerId: "",
  lastDone: 0,
  isOccurrence: false,
  occurrence: 0,
  occurrenceType: "daily",
  done: {},
  tasks: {},
  deletedAt: 0,
};
