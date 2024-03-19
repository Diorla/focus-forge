import ActivityModel from "../schema/Activity/Model";
import DoneModel from "../schema/Done/Model";
import TaskModel from "../schema/Task/Model";
import UserModel from "../schema/User/Model";

type SQLiteContextType = {
  restartDB: () => void;
  isReady: boolean;
  user: UserModel;
  activity: ActivityModel[];
  task: TaskModel[];
  done: DoneModel[];
  createUser: () => void;
  updateUser: (data: Partial<UserModel>) => void;
  deleteUser: () => void;
};
export default SQLiteContextType;
