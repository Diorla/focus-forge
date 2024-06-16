import UserModel from "./UserModel";

export interface UserContextType {
  user: UserModel;
  loading: boolean;
}
