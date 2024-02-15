import BaseModel from "../../BaseModel";
import ActivityModel from "./Model";

export type Priority = "high" | "medium" | "low" | "none";

type objKeys = keyof ActivityModel;

type ActivityMetadata = {
  [keys in objKeys]: BaseModel;
};

export default ActivityMetadata;
