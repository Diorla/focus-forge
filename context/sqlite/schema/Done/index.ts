import DoneModel from "./Model";
import DoneMetadata from "./Metadata";
import uuid from "react-native-uuid";
import generateObj from "../../scripts/generateObj";
import mergeObject from "../../scripts/mergeObject";

type Exclude = "id";

class Done {
  static tableName = "done";
  private static init: DoneModel = {
    id: "",
    datetime: 0,
    comment: "",
    activityId: "",
    length: 0,
  };

  static primaryKey = "id";
  static notNull = [];
  static autoIncrement = false;

  value = { ...Done.init, id: String(uuid.v4()) };
  constructor(data?: Omit<DoneModel, Exclude>) {
    this.value = {
      ...mergeObject(this.value, data),
    };
  }

  static getMetaData(): DoneMetadata {
    const obj = {};
    const extra = {
      primaryKey: Done.primaryKey,
      notNull: Done.notNull,
      autoIncrement: Done.autoIncrement,
    };
    for (const key in Done.init) {
      if (typeof Done.init[key] === "number") {
        const current = generateObj(key, "REAL", extra);
        obj[key] = current;
      } else if (typeof Done.init[key] === "boolean") {
        const current = generateObj(key, "INTEGER", extra);
        obj[key] = current;
      } else {
        const current = generateObj(key, "TEXT", extra);
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
