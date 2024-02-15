import ActivityModel from "../../services/db/schema/Activity/Model";
import Activity from "../../services/db/schema/Activity";
import updateRow from "../../services/db/updateRow";
import { logError } from "../../services/database";
import { openDatabase } from "../../services/db";

const db = openDatabase();

export default async function updateActivity(
  id: string,
  data: Partial<ActivityModel>,
  forceUpdate
) {
  updateRow({
    db,
    table: Activity.tableName,
    data: { ...data, id },
    callback: forceUpdate,
    errorCallback: (error) => logError("Activity", "update row", error),
  });
}
