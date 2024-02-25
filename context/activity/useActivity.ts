import { useContext } from "react";
import activityContext from "./activityContext";
import Schedule from "./Schedule";
import ActivityModel from "../../services/db/schema/Activity/Model";
import DoneModel from "../../services/db/schema/Done/Model";
import TaskModel from "../../services/db/schema/Task/Model";

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
    updateDone: (id: string, data: Partial<DoneModel>) => Promise<void>;
    createDone: (activities: DoneModel) => Promise<void>;
    deleteDone: (id: string) => Promise<void>;
    updateTask: (id: string, data: Partial<TaskModel>) => Promise<void>;
    createTask: (activities: TaskModel) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
  }

  return useContext<TaskContext>(activityContext);
}
