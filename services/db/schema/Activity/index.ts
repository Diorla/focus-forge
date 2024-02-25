import ActivityModel from "./Model";
import ActivityMetadata from "./Metadata";
import uuid from "react-native-uuid";
import { random } from "../../../color";
import generateObj from "../generateObj";

type Exclude = "createdAt" | "updatedAt";

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
    timerLength: 0,
    timerId: "",
    lastDone: 0,
  };

  value = { ...Activity.init };

  static primaryKey = "id";
  static notNull = [];
  static autoIncrement = false;

  constructor(data?: Omit<ActivityModel, Exclude>) {
    this.value = {
      ...this.value,
      ...data,
      id: data.id || String(uuid.v4()),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }

  static getMetaData(): ActivityMetadata {
    const obj = {};

    const extra = {
      primaryKey: Activity.primaryKey,
      notNull: Activity.notNull,
      autoIncrement: Activity.autoIncrement,
    };
    for (const key in Activity.init) {
      if (typeof Activity.init[key] === "number") {
        const current = generateObj(key, "REAL", extra);
        obj[key] = current;
      } else if (typeof Activity.init[key] === "boolean") {
        const current = generateObj(key, "INTEGER", extra);
        obj[key] = current;
      } else {
        const current = generateObj(key, "TEXT", extra);
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
