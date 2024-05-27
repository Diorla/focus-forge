import ActivityModel from "./model/ActivityModel";
import UserModel from "./model/UserModel";

type DataContextType = {
  isReady: boolean;
  user: UserModel;
  activityList: ActivityModel[];
  createUser: (user: UserModel) => void;
  updateUser: (data: Partial<UserModel>) => void;
  deleteUser: () => void;
  createActivity: (data: Partial<ActivityModel>) => void;
  updateActivity: (id: string, data: Partial<ActivityModel>) => void;
  deleteActivity: (id: string) => void;
  restartDB: () => void;
};
export default DataContextType;
