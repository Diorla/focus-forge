import updateActivity from "./updateActivity";

export default function archiveActivity(id: string) {
  return updateActivity({ id, archived: Date.now() });
}
