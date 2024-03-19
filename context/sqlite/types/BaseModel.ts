export type DataType = "INTEGER" | "TEXT" | "REAL";

type BaseModel = {
  // Boolean is recognised as 0 or 1 in INTEGER
  // Numbers are REAL
  // Strings and objects are TEXT. Stringify all objects
  type: DataType;
  primaryKey?: boolean;
  allowNull?: boolean;
  defaultValue?: unknown;
  autoIncrement?: boolean;
};

export default BaseModel;
