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
  };

  primaryKey = "id";
  notNull = [];
  autoIncrement = true;

  value = { ...Task.init };

  constructor(data?: Omit<TaskModel, Exclude>) {
    this.value = {
      ...data,
      created: Date.now(),
    };
  }

  static getMetaData(): TaskMetadata {
    const obj = {};

    for (const key in Task.init) {
      if (typeof Task.init[key] === "number") {
        const current = generateObj(key, "REAL");
        obj[key] = current;
      } else if (typeof Task.init[key] === "boolean") {
        const current = generateObj(key, "INTEGER");
        obj[key] = current;
      } else {
        const current = generateObj(key, "TEXT");
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
