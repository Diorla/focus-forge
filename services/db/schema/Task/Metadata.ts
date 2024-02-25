import BaseModel from "../../BaseModel";
import TaskModel from "./Model";

type objKeys = keyof TaskModel;

export type TaskMetadata = {
  [keys in objKeys]: BaseModel;
};

export default TaskMetadata;
