import UserModel from "./UserModel";

export const initialUser: UserModel = {
  id: "",
  name: "",
  weeklyQuota: 0,
  dailyQuota: [0, 0, 0, 0, 0, 0, 0],
  useWeeklyQuota: false,
  updatedAt: 0,
  startTime: 0,
  createdAt: 0,
  email: "",
  registered: false,
  mode: "",
};
