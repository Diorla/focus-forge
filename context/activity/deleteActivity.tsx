import Activity from "../../services/db/schema/Activity";
import deleteRow from "../../services/db/deleteRow";
import { logError } from "../../services/database";
import { openDatabase } from "../../services/db";

const db = openDatabase();

export default async function deleteActivity(id: string, forceUpdate) {
  deleteRow({
    db,
    table: Activity.tableName,
    id,
    callback: forceUpdate,
    errorCallback: (error) => logError("Activity", "delete row", error),
  });
}
