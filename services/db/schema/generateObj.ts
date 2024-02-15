import BaseModel, { DataType } from "../BaseModel";

export default function generateObj(key: string, type: DataType): BaseModel {
  const current: BaseModel = {
    type,
  };
  if (key === this.primaryKey) {
    current.primaryKey = true;
    if (this.autoIncrement) current.autoIncrement = true;
    if (this.notNull.includes(key)) current.allowNull = false;
  }
  return current;
}
