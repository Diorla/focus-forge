import Done from "../../services/db/schema/Done";
import deleteRow from "../../services/db/deleteRow";
import { logError } from "../../services/database";
import { openDatabase } from "../../services/db";

const db = openDatabase();

export default async function deleteDone(id: string, forceUpdate) {
  deleteRow({
    db,
    table: Done.tableName,
    id,
    callback: forceUpdate,
    errorCallback: (error) => logError("Done", "delete row", error),
  });
}
