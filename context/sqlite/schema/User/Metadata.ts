import BaseModel from "../../types/BaseModel";
import UserModel from "./Model";

type objKeys = keyof UserModel;

type UserMetadata = {
  [keys in objKeys]: BaseModel;
};

export default UserMetadata;
