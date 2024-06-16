import deleteDoc from "./deleteDoc";

export default function deleteActivity(id: string) {
  return deleteDoc("activityList", id);
}
