import DoneModel from "./Model";
import DoneMetadata from "./Metadata";
import uuid from "react-native-uuid";
import generateObj from "../generateObj";

type Exclude = "id";

class Done {
  static tableName = "done";
  value: DoneModel = {
    id: "",
    dateTime: 0,
    comment: "",
    activityId: "",
  };

  primaryKey = "id";
  notNull = [];
  autoIncrement = true;

  constructor(data: Omit<DoneModel, Exclude>) {
    this.value = {
      ...data,
      id: String(uuid.v4()),
    };
  }

  getMetaData(): DoneMetadata {
    const obj = {};

    for (const key in this.value) {
      if (typeof this.value[key] === "number") {
        const current = generateObj(key, "REAL");
        obj[key] = current;
      } else if (typeof this.value[key] === "boolean") {
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
