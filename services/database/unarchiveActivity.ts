import updateActivity from "./updateActivity";

export default function unarchiveActivity(id: string) {
  return updateActivity({ id, archived: false });
}
