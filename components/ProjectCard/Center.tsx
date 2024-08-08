import Schedule from "@/context/schedule/Schedule";
import CardProps from "./CardProps";
import TimeRunning from "./TimeRunning";
import MainInfo from "./MainInfo";
import TodoInfo from "./TodoInfo";
import ArchivedInfo from "./ArchivedInfo";
import BrowserInfo from "./BrowserInfo";
import CheckedInfo from "./CheckedInfo";

export default function Center({ item, type }: CardProps) {
  if (type === "today") return <TimeRunning schedule={item as Schedule} />;
  if (type === "todo") return <TodoInfo item={item} />;
  if (type === "archived") return <ArchivedInfo item={item} />;
  if (type === "checked") return <CheckedInfo item={item} />;
  if (!type) return <BrowserInfo item={item} />;
  return <MainInfo schedule={item as Schedule} type={type} />;
}
