import dayjs from "dayjs";
import ActivityModel from "../../services/db/schema/Activity/Model";
import DoneModel from "../../services/db/schema/Done/Model";
import UserModel from "../../services/db/schema/User/Model";

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

export default function getTime(
  activities: ActivityModel[],
  done: DoneModel[],
  user: UserModel
) {
  const { weeklyQuota: WQ, useWeeklyQuota, dailyQuota } = user;
  /**
   * Total time set aside for the week
   */
  let weeklyQuota = 0;
  /**
   * the time already spent on task excluding today
   */
  let doneThisWeek = 0;
  /**
   * the time already spent on task today
   */
  let doneToday = 0;
  /**
   * How long remaining, by subtracting the time already spent on task from weeklyQuota
   * If it is less than 0, then it should be 0 of course
   */
  let thisWeekRemaining = 0;
  /**
   * The number of days remaining for doing task, including today, so the
   * minimum is 1 and the max is 7
   */
  const daysRemaining = 7 - dayjs().day();
  /**
   * The time that should be set aside for today
   */
  let todayQuota = 0;
  /**
   * The total number of time that is set aside for today, this happens when user
   * exceed what they have today
   */
  let todayTime = 0;
  /**
   * The cumulative time from previous days that was unused
   */
  let leftover = 0;
  /**
   * All the time left for future time, would be 0 if the days remaining is 1 (no tomorrow)
   */
  let upcomingTime = 0;
  /**
   * today time minus done today. Indicates how much time left for today
   */
  let todayRemaining = 0;

  if (useWeeklyQuota) {
    weeklyQuota = WQ;
  } else {
    weeklyQuota = dailyQuota.reduce((prev, curr) => prev + curr, 0);
  }
  activities.forEach((item) => {
    const doneList = done.filter((doneItem) => doneItem.activityId === item.id);
    const timeToday = doneList.filter((done) => dayjs(done.datetime).isToday());
    const timeThisWeek = doneList.filter(
      (done) =>
        dayjs().isSame(done.datetime, "week") && !dayjs(done.datetime).isToday()
    );
    timeToday.forEach((done) => (doneToday += done.length));
    timeThisWeek.forEach((done) => (doneThisWeek += done.length));
  });
  thisWeekRemaining = weeklyQuota - doneThisWeek;
  if (thisWeekRemaining < 0) thisWeekRemaining = 0;

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
