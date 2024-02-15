import DoneModel from "./Model";
import DoneMetadata from "./Metadata";
import uuid from "react-native-uuid";
import generateObj from "../generateObj";

type Exclude = "id";

class Done {
  static tableName = "done";
  private static init: DoneModel = {
    id: "",
    dateTime: 0,
    comment: "",
    activityId: "",
  };

  primaryKey = "id";
  notNull = [];
  autoIncrement = true;

  value = { ...Done.init };
  constructor(data?: Omit<DoneModel, Exclude>) {
    this.value = {
      ...data,
      id: String(uuid.v4()),
    };
  }

  static getMetaData(): DoneMetadata {
    const obj = {};

    for (const key in Done.init) {
      if (typeof Done.init[key] === "number") {
        const current = generateObj(key, "REAL");
        obj[key] = current;
      } else if (typeof Done.init[key] === "boolean") {
        const current = generateObj(key, "INTEGER");
        obj[key] = current;
      } else {
        const current = generateObj(key, "TEXT");
        obj[key] = current;
      }
    }

    return obj as DoneMetadata;
  }

  getData() {
    return this.value;
  }
  getKeys() {
    return Object.keys(this.value);
  }
}

export default Done;
