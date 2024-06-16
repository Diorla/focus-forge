import ActivityModel from "./model/ActivityModel";

type DataContextType = {
  activityList: ActivityModel[];
  // createActivity: (data: Partial<ActivityModel>) => void;
  // updateActivity: (id: string, data: Partial<ActivityModel>) => void;
  // deleteActivity: (id: string) => void;
  // restartDB: () => void;
  time: number;
};
export default DataContextType;
