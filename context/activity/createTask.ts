import { insertRow, openDatabase } from "../../services/db";
import TaskModel from "../../services/db/schema/Task/Model";
import Task from "../../services/db/schema/Task";
import { logError } from "../../services/database";

const db = openDatabase();

export default async function createTask(task: TaskModel, forceUpdate) {
  const newTask = new Task(task);
  insertRow({
    db,
    table: Task.tableName,
    data: newTask.getData(),
    callback: forceUpdate,
    errorCallback: (error) => logError("Task", "create row", error),
  });
}
