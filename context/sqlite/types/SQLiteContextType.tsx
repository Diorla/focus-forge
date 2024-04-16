import ActivityModel from "../schema/Activity/Model";
import DoneModel from "../schema/Done/Model";
import TaskModel from "../schema/Task/Model";
import UserModel, { DailyQuota } from "../schema/User/Model";

type SQLiteContextType = {
  restartDB: (fn: () => Promise<void>) => void;
  isReady: boolean;
  user: UserModel;
  activityList: ActivityModel[];
  taskList: TaskModel[];
  doneList: DoneModel[];
  createUser: (user: {
    name: string;
    dailyQuota: DailyQuota;
    useWeeklyQuota: boolean;
    weeklyQuota: number;
  }) => void;
  updateUser: (data: Partial<UserModel>) => void;
  deleteUser: () => void;
  createActivity: (data: Partial<ActivityModel>) => void;
  updateActivity: (id: string, data: Partial<ActivityModel>) => void;
  deleteActivity: (id: string) => void;
  updateDone: (id: string, data: Partial<DoneModel>) => void;
  createDone: (activities: DoneModel) => void;
  deleteDone: (id: string) => void;
  updateTask: (id: string, data: Partial<TaskModel>) => void;
  createTask: (activities: TaskModel) => void;
  deleteTask: (id: string) => void;
};
export default SQLiteContextType;
