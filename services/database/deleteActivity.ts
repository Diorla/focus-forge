import deleteDoc from "./deleteDoc";

export default function deleteActivity(id: string) {
  return deleteDoc("activities", id);
}
