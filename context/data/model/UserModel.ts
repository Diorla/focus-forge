export type DailyQuota = [
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

interface UserModel {
  /**
   * The user id, just "user" for someone who is not signed in
   */
  id: string;
  /**
   * Used to identify the user and refer to the user as well
   */
  name: string;
  /**
   * Hours and minute
   */
  weeklyQuota: number;
  /**
   * The time for each day of the week
   */
  dailyQuota: DailyQuota;
  /**
   * Whether to use daily or weekly quota
   */
  useWeeklyQuota: boolean;
  /**
   * metadata
   */
  updatedAt: number;
  startTime: number;
  createdAt: number;
}

export default UserModel;
