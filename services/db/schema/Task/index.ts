import TaskModel from "./Model";
import TaskMetadata from "./Metadata";
import generateObj from "../generateObj";

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

  value = { ...Task.init };

  constructor(data?: Omit<TaskModel, Exclude>) {
    this.value = {
      ...data,
      created: Date.now(),
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
