import { insertRow, openDatabase } from "../../services/db";
import ActivityModel from "../../services/db/schema/Activity/Model";
import Activity from "../../services/db/schema/Activity";
import { logError } from "../../services/database";

const db = openDatabase();

export default async function createActivity(
  activity: ActivityModel,
  forceUpdate
) {
  const newActivity = new Activity(activity);
  insertRow({
    db,
    table: Activity.tableName,
    data: newActivity.getData(),
    callback: forceUpdate,
    errorCallback: (error) => logError("Activity", "create row", error),
  });
}
