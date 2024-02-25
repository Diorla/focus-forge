import DoneModel from "../../services/db/schema/Done/Model";
import Done from "../../services/db/schema/Done";
import updateRow from "../../services/db/updateRow";
import { logError } from "../../services/database";
import { openDatabase } from "../../services/db";

const db = openDatabase();

export default async function updateDone(
  id: string,
  data: Partial<DoneModel>,
  forceUpdate
) {
  updateRow({
    db,
    table: Done.tableName,
    data: { ...data, id },
    callback: forceUpdate,
    errorCallback: (error) => logError("Done", "update row", error),
  });
}
