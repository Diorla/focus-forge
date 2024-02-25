import Task from "../../services/db/schema/Task";
import deleteRow from "../../services/db/deleteRow";
import { logError } from "../../services/database";
import { openDatabase } from "../../services/db";

const db = openDatabase();

export default async function deleteTask(id: string, forceUpdate) {
  deleteRow({
    db,
    table: Task.tableName,
    id,
    callback: forceUpdate,
    errorCallback: (error) => logError("Task", "delete row", error),
  });
}
