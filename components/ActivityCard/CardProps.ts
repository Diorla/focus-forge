import ActivityModel from "@/context/data/model/ActivityModel";
import Checklist from "@/context/schedule/Checklist";
import Schedule from "@/context/schedule/Schedule";

export default interface CardProps {
  item: Checklist | ActivityModel | Schedule;
  type?:
    | "todo"
    | "today"
    | "upcoming"
    | "previous"
    | "recent"
    | "archived"
    | "checked"
    | "overflow";
}
