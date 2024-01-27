import { Typography } from "../../components";
import { View } from "react-native";
import { Schedule } from "../../context/activity/getSchedule";
import { secondsToHrMm } from "../../services/datetime";

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
        Progress
      </Typography>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <View>
          <Typography color={color} style={{ textAlign: "center" }}>
            This week
          </Typography>
          <Typography
            type="bigHeader"
            color={color}
            style={{ textAlign: "center" }}
          >
            {h}h {String(m).padStart(2, "0")}
          </Typography>
          <Typography type="big" color={color} style={{ textAlign: "center" }}>
            {weekPercent.toFixed(2)}%
          </Typography>
        </View>
        <View>
          <Typography color={color} style={{ textAlign: "center" }}>
            Today
          </Typography>
          <Typography
            type="bigHeader"
            color={color}
            style={{ textAlign: "center" }}
          >
            {hh}h {String(mm).padStart(2, "0")}
          </Typography>
          <Typography type="big" color={color} style={{ textAlign: "center" }}>
            {dayPercent.toFixed(2)}%
          </Typography>
        </View>
      </View>
    </View>
  );
}
