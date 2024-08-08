import ActivityModel from "../data/model/ActivityModel";
import UserModel from "../user/UserModel";
import getSchedule from "./getSchedule";
import getTime from "./getTime";

export default function generateSchedule(
  activityList: ActivityModel[],
  user: UserModel
) {
  {
    const scheduledActivityList = activityList.filter(
      (item) => !item.isOccurrence
    );

    const time = getTime(scheduledActivityList, user);

    const scheduleList = getSchedule({
      activities: scheduledActivityList,
      initialTodayRemaining: time.todayRemaining,
      initialUpcomingTime: time.upcomingTime,
    });

    let todoTime = 0;
    let taskDone = 0;
    let taskLeft = 0;
    let totalDone = 0;

    scheduleList?.forEach((item) => {
      const { todayTime, doneToday } = item;
      todoTime += todayTime - doneToday;
      const timeLeft = todayTime - doneToday;
      totalDone += doneToday;
      // TODO: Fix precision floating calculation with decimal.js
      if (todayTime && timeLeft > 0.0001) taskLeft++;
      if (todayTime && timeLeft <= 0.0001) taskDone++;
    });

    return { scheduleList, todoTime, taskDone, taskLeft, doneToday: totalDone };
  }
}
