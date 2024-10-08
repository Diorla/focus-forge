import DoneType from "../types/DoneType";

export type OccurrenceType = "daily" | "weekly" | "monthly" | "yearly";

interface ActivityModel {
  id: string;
  name: string;
  /**
   * Applicable if occurrence is 0
   */
  weeklyTarget: number;
  /**
   * Applicable if occurrence is 0
   */
  dailyLimit: number;
  startDate: number;
  priority: number;
  description: string;
  color: string;
  category: string;
  archived: number;
  updatedAt: number;
  createdAt: number;
  timerStart: number;
  timerLength: number;
  timerId: string;
  lastDone: number;
  /**
   * To be used in case of occurrence
   */
  isOccurrence: boolean;
  /**
   * How many times this activity has should occur
   */
  occurrence: number;
  /**
   * How often this activity should occur
   */
  occurrenceType: OccurrenceType;
  /**
   * The time when the occurrence could start,
   * just from 0 to 23
   */
  occurrenceStart: number;
  /**
   * Each time a time is recorded, or occurrence is marked
   * In case of occurrence, the length will be 1
   * The key is the datetime that it happened
   */
  done: {
    [key: string]: DoneType;
  };
  /**
   * All the task added to an activity
   */
  tasks: {
    [created: string]: {
      title: string;
      /**
       * I'm using number to represent the date it was checked while 0 is not
       * checked
       */
      checked: number;
    };
  };
  deletedAt: number;
  userId: string;
}

export default ActivityModel;
