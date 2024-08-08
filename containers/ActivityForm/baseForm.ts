import ActivityModel from "@/context/data/model/ActivityModel";
import { random } from "@/services/color";

export const baseForm: ActivityModel = {
  name: "",
  weeklyTarget: 0,
  dailyLimit: 0,
  startDate: Date.now(),
  priority: 0,
  color: random(),
  category: "",
  description: "",
  id: "",
  archived: 0,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  lastDone: 0,
  timerStart: 0,
  timerLength: 0,
  timerId: "",
  occurrence: 0,
  occurrenceType: "daily",
  done: {},
  tasks: {},
  isOccurrence: false,
  deletedAt: 0,
  userId: "",
  occurrenceStart: 0,
};
