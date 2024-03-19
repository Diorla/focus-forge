import BaseModel, { DataType } from "../types/BaseModel";

export default function generateObj(
  key: string,
  type: DataType,
  extra: {
    primaryKey: string;
    autoIncrement: boolean;
    notNull: string[];
  }
): BaseModel {
  const current: BaseModel = {
    type,
  };
  const { primaryKey, autoIncrement, notNull } = extra;
  if (key === primaryKey) {
    current.primaryKey = true;
    if (autoIncrement) current.autoIncrement = true;
    if (notNull.includes(key)) current.allowNull = false;
  }
  return current;
}
