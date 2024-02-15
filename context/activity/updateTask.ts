import TaskModel from "../../services/db/schema/Task/Model";
import Task from "../../services/db/schema/Task";
import updateRow from "../../services/db/updateRow";
import { logError } from "../../services/database";
import { openDatabase } from "../../services/db";

const db = openDatabase();

export default async function updateTask(
  id: string,
  data: Partial<TaskModel>,
  forceUpdate
) {
  updateRow({
    db,
    table: Task.tableName,
    data: { ...data, id },
    callback: forceUpdate,
    errorCallback: (error) => logError("Task", "update row", error),
  });
}
