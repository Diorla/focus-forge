// the time to spend or already spent today
export default function getTodayTime(todayQuota: number, doneToday: number) {
  // If the time used is greater than today quota, then we need to increase
  // today quota to match
  if (todayQuota > doneToday) return todayQuota;
  return doneToday;
}
