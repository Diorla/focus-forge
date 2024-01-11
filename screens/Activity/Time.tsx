import { Typography } from "../../components";
import { View } from "react-native";
import secondsToHrMm from "../../services/date/minutesToHrMm";
import { Schedule } from "../../context/activity/getSchedule";

export default function Time({
  activity,
  color,
}: {
  activity: Schedule;
  color: string;
}) {
  const {
    doneThisWeek,
    weeklyTarget,
    doneToday,
    todayRemaining,
    additionalTime,
  } = activity;

  const allDoneThisWeek = doneThisWeek + doneToday;
  const allTodoToday = todayRemaining + additionalTime + doneToday;

  const [h, m] = secondsToHrMm(allDoneThisWeek);
  const [hh, mm] = secondsToHrMm(doneToday);

  const weekPercent = (allDoneThisWeek / weeklyTarget) * 100;
  const dayPercent = (doneToday / allTodoToday) * 100;

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Typography
        type="header"
        color={color}
        style={{ textAlign: "center", marginBottom: 8 }}
      >
        Time left
      </Typography>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <View>
          <Typography color={color}>This week</Typography>
          <Typography type="bigHeader" color={color}>
            {h}h {String(m).padStart(2, "0")}
          </Typography>
          <Typography type="big" color={color}>
            {weekPercent.toFixed(2)}% Complete
          </Typography>
        </View>
        <View>
          <Typography color={color}>Today</Typography>
          <Typography type="bigHeader" color={color}>
            {hh}h {String(mm).padStart(2, "0")}
          </Typography>
          <Typography type="big" color={color}>
            {dayPercent.toFixed(2)}% Complete
          </Typography>
        </View>
      </View>
    </View>
  );
}
