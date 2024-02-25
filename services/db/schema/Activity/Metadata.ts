import BaseModel from "../../BaseModel";
import ActivityModel from "./Model";

type objKeys = keyof ActivityModel;

type ActivityMetadata = {
  [keys in objKeys]: BaseModel;
};

export default ActivityMetadata;
