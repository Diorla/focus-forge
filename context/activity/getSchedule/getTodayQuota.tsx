// today quota based on user's ideal timing
// Of course if there is less task todo time left, the quota will be less
export default function getTodayQuota(
  thisWeekRemaining: number,
  upperLimit: number
) {
  // If the time remaining this week is less than dailyLimit
  // then we need to lower today quota to the time remaining
  if (thisWeekRemaining > upperLimit) return upperLimit;
  return thisWeekRemaining;
}
