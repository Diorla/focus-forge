import TaskModel from "./Model";
import TaskMetadata from "./Metadata";
import generateObj from "../../scripts/generateObj";
import uuid from "react-native-uuid";
import mergeObject from "../../scripts/mergeObject";

type Exclude = "created";

class Task {
  static tableName = "tasks";

  private static init: TaskModel = {
    activityId: "",
    title: "",
    checked: 0,
    created: 0,
    id: "",
  };

  static primaryKey = "id";
  static notNull = [];
  static autoIncrement = false;

  value = {
    ...Task.init,
    id: String(uuid.v4()),
    created: Date.now(),
  };

  constructor(data?: Omit<TaskModel, Exclude>) {
    this.value = {
      ...mergeObject(this.value, data),
    };
  }

  static getMetaData(): TaskMetadata {
    const obj = {};
    const extra = {
      primaryKey: Task.primaryKey,
      notNull: Task.notNull,
      autoIncrement: Task.autoIncrement,
    };
    for (const key in Task.init) {
      if (typeof Task.init[key] === "number") {
        const current = generateObj(key, "REAL", extra);
        obj[key] = current;
      } else if (typeof Task.init[key] === "boolean") {
        const current = generateObj(key, "INTEGER", extra);
        obj[key] = current;
      } else {
        const current = generateObj(key, "TEXT", extra);
        obj[key] = current;
      }
    }

    return obj as TaskMetadata;
  }

  getData() {
    return this.value;
  }
  getKeys() {
    return Object.keys(this.value);
  }
}

export default Task;
