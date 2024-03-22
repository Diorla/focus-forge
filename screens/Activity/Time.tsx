import { TimeFormat, Typography } from "../../components";
import { View } from "react-native";
import Schedule from "../../context/schedule/Schedule";
import { secondsToHrMm } from "../../services/datetime";

export default function Time({
  activity,
  color,
}: {
  activity: Schedule;
  color: string;
}) {
  const { doneThisWeek, weeklyTarget, doneToday, todayTime } = activity;

  const allDoneThisWeek =
    doneThisWeek + doneToday + 0.00000000000000000000000001;
  const allTodoToday = todayTime + 0.00000000000000000000000001;

  const timeLeftThisWeek = weeklyTarget - allDoneThisWeek;
  const [h, m] = secondsToHrMm(timeLeftThisWeek <= 0 ? 0 : timeLeftThisWeek);
  // TODO: Use decimal formatting and eliminate this less than 0.0001
  const todayRemaining = allTodoToday - doneToday;
  const [hh, mm] = secondsToHrMm(todayRemaining < 0.0001 ? 0 : todayRemaining);

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
        Todo
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
          <TimeFormat
            color={color}
            value={allDoneThisWeek}
            style={{ textAlign: "center" }}
          />
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
          <TimeFormat
            color={color}
            value={doneToday}
            style={{ textAlign: "center" }}
          />
          <Typography type="big" color={color} style={{ textAlign: "center" }}>
            {dayPercent.toFixed(2)}%
          </Typography>
        </View>
      </View>
    </View>
  );
}
