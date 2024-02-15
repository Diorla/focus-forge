import { useContext } from "react";
import activityContext from "./activityContext";
import Schedule from "./Schedule";
import ActivityModel from "../../services/db/schema/Activity/Model";

export default function useActivity() {
  interface TaskContext {
    /**
     * All the activities of the user
     */
    activities: ActivityModel[];
    /**
     * If there is an error
     */
    error: Error;
    /**
     * Still retrieving the activities
     */
    loading: boolean;

    time: {
      doneThisWeek: number;
      doneToday: number;
      thisWeekRemaining: number;
      todayRemaining: number;
      weeklyQuota: number;
      daysRemaining: number;
      todayQuota: number;
      leftover: number;
      todayTime: number;
      upcomingTime: number;
      todoTime: number;
      taskDone: number;
      taskLeft: number;
    };
    schedule: Schedule[];
    updateActivity: (id: string, data: Partial<ActivityModel>) => Promise<void>;
    createActivity: (activities: ActivityModel) => Promise<void>;
    deleteActivity: (id: string) => Promise<void>;
  }

  return useContext<TaskContext>(activityContext);
}
