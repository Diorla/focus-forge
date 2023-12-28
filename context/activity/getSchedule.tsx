import dayjs from "dayjs";
import Activity from "../../models/Activity";
import User from "../../models/User";

export type Schedule = Activity & {
  doneToday: number;
  doneThisWeek: number;
  thisWeekRemaining: number;
  todayQuota: number;
  futureTime: number;
  todayTime: number;
  additionalTime: number;
  upcomingTime: number;
  overflowTime: number;
  todayRemaining: number;
};

/**
 * => Activity
 * Done today (DT) => All the time done today
 * Done this week (DTW) => All the time done this week, excluding today
 * Daily limit (DL) => Ideal time for a week
 * Weekly target (WT) => Alloted time for the week
 * This week remaining TWR => WT - DTW
 * Today Quota (TQ) => It should be the daily limit if TWR > DL, else it is TWR
 * Future Time (FT) => The time that will be alloted for upcoming time or overflow time
 * Today time (TT) => TQ or DT, whichever is bigger
 * Today remaining (TR) => TT - DT, indicates how much time is left
 * Additional today (AT) => if user doesn't have enough time to cover FT, then the extra time left will be moved to AT as long as there is time today to cover them.
 * Upcoming time (UT) => FT that is covered
 * Overflow time (OT) => FT that is not covered by AT or UT
 */
export default function formatTime(
  activities: Activity[],
  initialTodayRemaining: number,
  initialUpcomingTime: number
) {
  const list: Schedule[] = [];

  let userTodayRemaining = initialTodayRemaining;
  let userUpcomingTime = initialUpcomingTime;

  activities.forEach((item) => {
    // time already done for today
    let doneToday = 0;
    // time already for this week, excluding today
    let doneThisWeek = 0;
    // today quota based on user's ideal timing
    let todayQuota = 0;
    // the time to spend or already spent today
    let todayTime = 0;
    // time left to spend today, ie today quota exceeds done today
    let todayRemaining = 0;
    // all extra time left for the week
    let futureTime = 0;
    // extra time added to today because insufficient time in the following days
    let additionalTime = 0;
    // time available for the following week
    let upcomingTime = 0;
    // No more time to do anything this week
    let overflowTime = 0;

    const doneList = Object.keys(item.done || {});
    const timeToday = doneList.filter((datetime) => dayjs(datetime).isToday());
    const timeThisWeek = doneList.filter(
      (datetime) =>
        dayjs().isSame(datetime, "week") && !dayjs(datetime).isToday()
    );

    timeToday.forEach((date) => (doneToday += item.done[date]));
    timeThisWeek.forEach((date) => (doneThisWeek += item.done[date]));

    const tempTWR = item.weeklyTarget - doneThisWeek;
    const thisWeekRemaining = tempTWR > 0 ? tempTWR : 0;

    if (thisWeekRemaining > item.dailyLimit) todayQuota = item.dailyLimit;
    else todayQuota = thisWeekRemaining;

    if (todayQuota > doneToday) todayTime = todayQuota;
    else todayTime = doneToday;

    const tempTR = todayTime - doneToday;

    if (userTodayRemaining > tempTR) {
      userTodayRemaining -= tempTR;
      todayRemaining = tempTR;
    } else {
      const extra = todayRemaining - userTodayRemaining;
      todayRemaining = userTodayRemaining;
      userTodayRemaining = 0;
      futureTime += extra;
    }

    const accountedTime = doneThisWeek + doneToday + todayRemaining;
    const unaccountedTime = item.weeklyTarget - accountedTime;

    futureTime += unaccountedTime;

    if (userUpcomingTime > futureTime) {
      upcomingTime = futureTime;
      userTodayRemaining -= futureTime;
    } else {
      let tempOverflow = futureTime - userTodayRemaining;
      upcomingTime = userTodayRemaining;
      userTodayRemaining = 0;
      if (userTodayRemaining > tempOverflow) {
        additionalTime = tempOverflow;
      } else {
        additionalTime = userTodayRemaining;
        overflowTime = tempOverflow - additionalTime;
        userTodayRemaining = 0;
      }
    }

    list.push({
      ...item,
      doneThisWeek,
      doneToday,
      thisWeekRemaining,
      todayQuota,
      todayTime,
      todayRemaining,
      futureTime,
      additionalTime,
      upcomingTime,
      overflowTime,
    });
  });
  return list;
}
