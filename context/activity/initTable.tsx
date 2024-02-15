import { createTable, openDatabase } from "../../services/db";
import Activity from "../../services/db/schema/Activity";
import Done from "../../services/db/schema/Done";
import Task from "../../services/db/schema/Task";

export const db = openDatabase();

export default function initTable() {
  createTable(db, Activity.tableName, Activity.getMetaData());
  createTable(db, Done.tableName, Done.getMetaData());
  createTable(db, Task.tableName, Task.getMetaData());
}
