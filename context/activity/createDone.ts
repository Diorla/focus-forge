import { insertRow, openDatabase } from "../../services/db";
import DoneModel from "../../services/db/schema/Done/Model";
import Done from "../../services/db/schema/Done";
import { logError } from "../../services/database";

const db = openDatabase();

export default async function createDone(done: DoneModel, forceUpdate) {
  const newDone = new Done(done);
  insertRow({
    db,
    table: Done.tableName,
    data: newDone.getData(),
    callback: forceUpdate,
    errorCallback: (error) => logError("Done", "create row", error),
  });
}
