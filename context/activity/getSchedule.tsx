import dayjs from "dayjs";
import Activity from "../../models/Activity";

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
const priority = ["high", "medium", "low", "none"];

/**
 * Used to generate schedule for each task
 * @param activities list of activities that has been added
 * @param initialTodayRemaining total time remaining, minus done today
 * @param initialUpcomingTime all future time available
 * @returns
 */
export default function getSchedule(
  activities: Activity[],
  initialTodayRemaining: number,
  initialUpcomingTime: number
) {
  const list: Schedule[] = [];

  let currentTodayRemaining = initialTodayRemaining;
  let currentUpcomingTime = initialUpcomingTime;

  activities
    .sort((a, b) => priority.indexOf(a.priority) - priority.indexOf(b.priority))
    .forEach((item) => {
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
      // The last time the timer was paused

      const doneList = Object.keys(item.done || {});
      const lastDone = Math.max(
        ...doneList.map((item) => dayjs(item).valueOf())
      );
      const timeToday = doneList.filter((datetime) =>
        dayjs(datetime).isToday()
      );

      const timeThisWeek = doneList.filter(
        (datetime) =>
          dayjs().isSame(datetime, "week") && !dayjs(datetime).isToday()
      );

      timeToday.forEach((date) => (doneToday += item.done[date]));
      timeThisWeek.forEach((date) => (doneThisWeek += item.done[date]));

      // this week remaining should be greater or equal to 0
      const tempTWR = item.weeklyTarget - doneThisWeek;
      const thisWeekRemaining = tempTWR > 0 ? tempTWR : 0;

      // If the time remaining this week is less than dailyLimit
      // then we need to lower today quota to the time remaining
      if (thisWeekRemaining > item.dailyLimit) todayQuota = item.dailyLimit;
      else todayQuota = thisWeekRemaining;

      // If the time used is greater than today quota, then we need to increase
      // today quota to match
      if (todayQuota > doneToday) todayTime = todayQuota;
      else todayTime = doneToday;

      // Making sure there is enough time for todayTime
      if (currentTodayRemaining < todayTime) todayTime = currentTodayRemaining;

      // the task time left to do today, it should be ge to 0
      const tempTR = todayTime - doneToday;

      // Ensure that there is enough time to do task in the future as well
      if (currentTodayRemaining > tempTR) {
        // remove it from the cumulative today remaining
        currentTodayRemaining -= tempTR;
        todayRemaining = tempTR;
      } else {
        const extra = todayRemaining - currentTodayRemaining;
        todayRemaining = currentTodayRemaining;
        currentTodayRemaining = 0;
        futureTime += extra;
      }

      // all the time till today
      const accountedTime = doneThisWeek + doneToday + todayRemaining;
      // Remaining time for the rest of the week
      let unaccountedTime = item.weeklyTarget - accountedTime;

      // if the time for task already exceed weekly target
      if (unaccountedTime < 0) unaccountedTime = 0;
      futureTime += unaccountedTime;

      // Now to ensure that there is enough time in the future to complete the task
      if (currentUpcomingTime > futureTime) {
        //  We have enough time in the future
        upcomingTime = futureTime;
        currentUpcomingTime -= futureTime;
      } else {
        // Find the overflow time
        const tempOverflow = futureTime - currentUpcomingTime;
        upcomingTime = currentUpcomingTime;
        currentUpcomingTime = 0;
        // Assign the overflow time
        if (currentTodayRemaining > tempOverflow) {
          // if there is enough time today to cover overflow
          additionalTime = tempOverflow;
        } else {
          // currentTodayRemaining for user is less than overflow of the task
          additionalTime = currentTodayRemaining;
          // set overflow to the time not covered
          overflowTime = tempOverflow - additionalTime;
          currentTodayRemaining = 0;
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
        lastDone: Number.isFinite(lastDone) ? lastDone : 0,
      });
    });
  return list;
}
