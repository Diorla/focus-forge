import ActivityModel from "./Model";
import ActivityMetadata from "./Metadata";
import uuid from "react-native-uuid";
import { random } from "../../../color";
import generateObj from "../generateObj";

type Exclude = "createdAt" | "updatedAt" | "id";

class Activity {
  static tableName = "activities";

  private static init: ActivityModel = {
    id: "",
    name: "",
    weeklyTarget: 0,
    dailyLimit: 0,
    startDate: 0,
    priority: "none",
    description: "",
    color: random(),
    category: "",
    archived: 0,
    updatedAt: 0,
    createdAt: Date.now(),
    timerStart: 0,
    timerLength: "",
    timerId: "",
    lastDone: 0,
  };

  value = { ...Activity.init };

  constructor(data?: Omit<ActivityModel, Exclude>) {
    this.value = {
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      id: String(uuid.v4()),
    };
  }

  static getMetaData(): ActivityMetadata {
    const obj = {};

    for (const key in Activity.init) {
      if (typeof Activity.init[key] === "number") {
        const current = generateObj(key, "REAL");
        obj[key] = current;
      } else if (typeof Activity.init[key] === "boolean") {
        const current = generateObj(key, "INTEGER");
        obj[key] = current;
      } else {
        const current = generateObj(key, "TEXT");
        obj[key] = current;
      }
    }

    return obj as ActivityMetadata;
  }

  getData() {
    return this.value;
  }
  getKeys() {
    return Object.keys(this.value);
  }
}

export default Activity;
