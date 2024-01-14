export type DailyQuota = [
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

interface User {
  /**
   * The user id
   */
  id: string;
  /**
   * the email for the user
   */
  email: string;
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
   * Indicates whether the user has provided name and quota
   */
  registered: boolean;
  /**
   * metadata
   */
  updatedAt: number;
  startTime: number;
}

export default User;
