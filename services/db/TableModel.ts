export type DataType = "INTEGER" | "TEXT" | "REAL" | "BLOB";

export type Model = {
  // Boolean is recognised as 0 or 1 in INTEGER
  // Save datetime as REAL
  type: DataType;
  primaryKey?: boolean;
  allowNull?: boolean;
  defaultValue?: unknown;
  autoIncrement?: boolean;
};
interface TableModel {
  [key: string]: Model;
}

export default TableModel;
