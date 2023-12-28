import dayjs from "dayjs";
import Activity from "../../models/Activity";
import User from "../../models/User";

/**
 * => User
 * Weekly quota (WQ) => total number of time that will be spent on all task in a week =
 * Done this week (DTW) => All the time done this week, excluding today =
 * Done today (DT) => All the time done today, the time already used for task =
 * This week remaining (TWR) => WQ - DTW =
 * Days remaining (DR) => The number of days remaining, 7 is the maximum and 1 is the minimum, the last day. =
 * Leftovers (LO) => For daily quotas, indicates unused time from previous days. it is total before today - DTW.
 * Today quota (TQ) => the time that should be alloted for today. It depends on weekly quota or daily quota.
 * Today time (TT) => The time that is alloted for today, ideally it should be TQ, but if DT > TQ, then it is DT
 * Upcoming time (UT) => The time that remains for future task, ie TWR - TT
 * Today remaining (TR) => The time still available for assigning task today, it's TQ - DT
 */

export default function getTime(activities: Activity[], user: User) {
  const { weeklyQuota: WQ, useWeeklyQuota, dailyQuota } = user;
  let weeklyQuota = 0;
  let doneThisWeek = 0;
  let doneToday = 0;
  let thisWeekRemaining = 0;
  let daysRemaining = dayjs().day() + 1;
  let todayQuota = 0;
  let leftover = 0;
  let todayTime = 0;
  let upcomingTime = 0;
  let todayRemaining = 0;

  if (useWeeklyQuota) {
    weeklyQuota = WQ;
  } else {
    weeklyQuota = dailyQuota.reduce((prev, curr) => prev + curr, 0);
  }
  activities.forEach((item) => {
    const doneList = Object.keys(item.done || {});
    const timeToday = doneList.filter((datetime) => dayjs(datetime).isToday());
    const timeThisWeek = doneList.filter(
      (datetime) =>
        dayjs().isSame(datetime, "week") && !dayjs(datetime).isToday()
    );
    timeToday.forEach((date) => (doneToday += item.done[date]));
    timeThisWeek.forEach((date) => (doneThisWeek += item.done[date]));
  });
  thisWeekRemaining = weeklyQuota - doneThisWeek;

  if (useWeeklyQuota) {
    todayQuota = weeklyQuota / daysRemaining;
  } else {
    const dayOfWeek = dayjs().day();
    const beforeToday = dailyQuota.reduce((prev, curr, currIdx) => {
      if (currIdx < dayOfWeek) return prev + curr;
      else return prev + 0;
    }, 0);
    leftover = beforeToday - doneThisWeek;
    if (leftover > 0) todayQuota = dailyQuota[dayOfWeek] + leftover;
    else todayQuota = dailyQuota[dayOfWeek];
  }

  if (doneToday > todayQuota) todayTime = doneToday;
  else todayTime = todayQuota;
  upcomingTime = thisWeekRemaining - todayTime;
  /**
   * Now to ensure no negatives
   */
  if (upcomingTime < 0) {
    todayTime += upcomingTime;
    upcomingTime = 0;
  }
  const tempTodayRemaining = todayTime - doneToday;
  todayRemaining = tempTodayRemaining > 0 ? tempTodayRemaining : 0;
  return {
    weeklyQuota,
    doneThisWeek,
    doneToday,
    thisWeekRemaining,
    daysRemaining,
    todayQuota,
    leftover,
    todayTime,
    upcomingTime,
    todayRemaining,
  };
}
