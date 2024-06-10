import UserModel from "../data/model/UserModel";

export interface UserContextType {
  user: UserModel;
  createUser: (user: UserModel) => void;
  updateUser: (data: Partial<UserModel>) => void;
  deleteUser: () => void;
  loading: boolean;
}
