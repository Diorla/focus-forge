import ActivityModel from "./model/ActivityModel";
import UserModel, { DailyQuota } from "./model/UserModel";

type DataContextType = {
  restartDB: (fn: () => Promise<void>) => void;
  isReady: boolean;
  user: UserModel;
  activityList: ActivityModel[];
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
};
export default DataContextType;
