import Schedule from "../Schedule";
import getDoneToday from "./getDoneToday";
import getDoneThisWeek from "./getDoneThisWeek";
import getTodayQuota from "./getTodayQuota";
import getTodayTime from "./getTodayTime";
import ActivityModel from "../../data/model/ActivityModel";
import dayjs from "dayjs";

type ScheduleProps = {
  activities: ActivityModel[];
  initialTodayRemaining: number;
  initialUpcomingTime: number;
};

/**
 * Used to generate schedule for each task
 * @param activities list of activities that has been added
 * @param initialTodayRemaining total time remaining, minus done today
 * @param initialUpcomingTime all future time available
 * @returns
 */
export default function getSchedule({
  activities,
  initialTodayRemaining,
  initialUpcomingTime,
}: ScheduleProps) {
  const list: Schedule[] = [];

  let currentTodayRemaining = initialTodayRemaining;
  let currentUpcomingTime = initialUpcomingTime;

  activities
    ?.sort((a, b) => b.updatedAt - a.updatedAt)
    ?.sort((a, b) => b.priority - a.priority)
    .forEach((item) => {
      const doneList = Object.keys(item.done).map((key) => {
        return {
          datetime: dayjs(key).valueOf(),
          length: item.done[key].length,
          comment: item.done[key].comment,
        };
      });
      const doneToday = getDoneToday(doneList);
      const doneThisWeek = getDoneThisWeek(doneList);

      const lastDone = doneList
        // Remove future times
        .filter((done) => Date.now() > done.datetime)
        .sort((a, b) => b.datetime - a.datetime)[0]?.datetime;

      // this week remaining should be greater or equal to 0
      const tempTWR = item.weeklyTarget - doneThisWeek;
      const thisWeekRemaining = tempTWR > 0 ? tempTWR : 0;
      const todayQuota = getTodayQuota(thisWeekRemaining, item.dailyLimit);
      let todayTime = getTodayTime(todayQuota, doneToday);

      // Remove archived
      if (item.archived) {
        list.push({
          ...item,
          doneThisWeek,
          doneToday,
          todayTime: 0,
          upcomingTime: 0,
          overflowTime: 0,
          lastDone,
        });
        return null;
      }

      // all extra time left for the week
      let futureTime = 0;
      // extra time added to today because insufficient time in d following day
      let additionalTime = 0;
      // time available for the following week
      let upcomingTime = 0;
      // No more time to do anything this week
      let overflowTime = 0;

      // the task time left to do today, it should be ge to 0
      // done today is already subtracted, so we need to remove doneToday
      const tempTR = todayTime - doneToday;

      // Ensure that there is enough time today to do the task
      // If not, any extra is moved to the future
      if (currentTodayRemaining > tempTR) {
        // remove it from the cumulative today remaining
        currentTodayRemaining -= tempTR;
      } else {
        todayTime = todayTime - tempTR + currentTodayRemaining;
        const extra = tempTR - currentTodayRemaining;
        currentTodayRemaining = 0;
        futureTime += extra;
      }

      // all the time till today
      const accountedTime = doneThisWeek + todayTime + futureTime;
      // Remaining time for the rest of the week
      let unaccountedTime = item.weeklyTarget - accountedTime;

      // if the time for task already exceed weekly target
      if (unaccountedTime < 0) unaccountedTime = 0;
      futureTime += unaccountedTime;

      // Now to ensure that there is enough time in d future 2 complete the task
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
        todayTime: todayTime + additionalTime,
        upcomingTime,
        overflowTime,
        lastDone,
      });
    });
  return list;
}

/**
 * => Activity
 * Done today (DT) => All the time done today
 * Done this week (DTW) => All the time done this week, excluding today
 * Daily limit (DL) => Ideal time for a week
 * Weekly target (WT) => Alloted time for the week
 * This week remaining TWR => WT - DTW
 * Today Quota (TQ) => It should be the daily limit if TWR > DL, else it is TWR
 * Future Time (FT) => The time that will be alloted for upcoming time or
 * overflow time
 * Today time (TT) => TQ or DT, whichever is bigger
 * Today remaining (TR) => TT - DT, indicates how much time is left
 * Additional today (AT) => if user doesn't have enough time to cover FT, then
 * the extra time left will be moved to AT as long as there is time today to
 * cover them.
 * Upcoming time (UT) => FT that is covered
 * Overflow time (OT) => FT that is not covered by AT or UT
 */
