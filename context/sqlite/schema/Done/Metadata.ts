import BaseModel from "../../types/BaseModel";
import DoneModel from "./Model";

type objKeys = keyof DoneModel;

type DoneMetadata = {
  [keys in objKeys]: BaseModel;
};

export default DoneMetadata;
