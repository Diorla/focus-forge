export default function archiveActivity(id: string) {
  return { id, archived: Date.now() };
}
