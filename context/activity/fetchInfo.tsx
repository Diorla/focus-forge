import selectRow from "../../services/db/selectRow";
import Activity from "../../services/db/schema/Activity";
import Done from "../../services/db/schema/Done";
import Task from "../../services/db/schema/Task";
import { logError } from "../../services/database";
import { openDatabase } from "../../services/db";

const db = openDatabase();

export default function fetchInfo(setActivities, setDone, setTasks) {
  selectRow({
    db,
    table: Activity.tableName,
    callback: (_, result) => {
      setActivities(result.rows._array);
    },
    errorCallback: (error) => logError("get activity", "select row", error),
  });
  selectRow({
    db,
    table: Done.tableName,
    callback: (_, result) => {
      setDone(result.rows._array);
    },
    errorCallback: (error) => logError("get Done", "select row", error),
  });
  selectRow({
    db,
    table: Task.tableName,
    callback: (_, result) => {
      setTasks(result.rows._array);
    },
    errorCallback: (error) => logError("get Task", "select row", error),
  });
}
