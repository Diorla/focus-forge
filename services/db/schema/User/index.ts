import UserModel from "./Model";
import UserMetadata from "./Metadata";
import generateObj from "../generateObj";

type Exclude = "createdAt" | "updatedAt" | "id";

class User {
  static tableName = "user";

  private static init: UserModel = {
    id: User.tableName,
    name: "",
    updatedAt: 0,
    createdAt: Date.now(),
    weeklyQuota: 0,
    dailyQuota: [0, 0, 0, 0, 0, 0, 0],
    useWeeklyQuota: false,
    startTime: 0,
  };

  value = { ...User.init };

  static primaryKey = "id";
  static notNull = [];
  static autoIncrement = false;

  constructor(data?: Omit<UserModel, Exclude>) {
    this.value = {
      ...this.value,
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }

  static getMetaData(): UserMetadata {
    const obj = {};

    const extra = {
      primaryKey: User.primaryKey,
      notNull: User.notNull,
      autoIncrement: User.autoIncrement,
    };
    for (const key in User.init) {
      if (typeof User.init[key] === "number") {
        const current = generateObj(key, "REAL", extra);
        obj[key] = current;
      } else if (typeof User.init[key] === "boolean") {
        const current = generateObj(key, "INTEGER", extra);
        obj[key] = current;
      } else {
        const current = generateObj(key, "TEXT", extra);
        obj[key] = current;
      }
    }

    return obj as UserMetadata;
  }

  getData() {
    return {
      ...this.value,
      dailyQuota: JSON.stringify(this.value.dailyQuota),
      useWeeklyQuota: Number(this.value.useWeeklyQuota),
    };
  }
  getKeys() {
    return Object.keys(this.value);
  }
}

export default User;
