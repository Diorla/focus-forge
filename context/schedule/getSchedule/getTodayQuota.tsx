// today quota based on user's ideal timing

import dayjs from "dayjs";

// Of course if there is less task todo time left, the quota will be less
export default function getTodayQuota(
  thisWeekRemaining: number,
  upperLimit: number
) {
  const diff = 7 - dayjs().day();
  // Try and split the time left between the days
  const parts = thisWeekRemaining / diff;
  // If the day's limit is too low, then change it to current limit
  const currentLimit = parts > upperLimit ? parts : upperLimit;
  // If the time remaining this week is less than dailyLimit
  // then we need to lower today quota to the time remaining
  if (thisWeekRemaining < currentLimit) return thisWeekRemaining;
  return currentLimit;
}
