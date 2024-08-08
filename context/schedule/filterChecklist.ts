import ActivityModel from "../data/model/ActivityModel";

export default function filterChecklist(activity: ActivityModel) {
  return activity.isOccurrence && !activity.archived;
}
