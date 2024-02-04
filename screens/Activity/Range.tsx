import { Typography } from "../../components";
import { View } from "react-native";
import Schedule from "../../context/activity/Schedule";
import { format, secondsToHrMm } from "../../services/datetime";

export default function Range({
  activity,
  color,
}: {
  activity: Schedule;
  color: string;
}) {
  const { startDate, archived, weeklyTarget, category } = activity;

  const endDate = archived ? format(archived, "date") : "Forever";
  const [hh, mm] = secondsToHrMm(weeklyTarget);

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Typography style={{ textAlign: "center" }} color={color} type="caption">
        {category}
      </Typography>
      <Typography
        color={color}
        style={{ textAlign: "center", marginBottom: 8 }}
      >
        {format(startDate, "date")} - {endDate}
      </Typography>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Typography
          color={color}
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          Weekly target:{" "}
        </Typography>
        <Typography
          color={color}
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          {hh}h {mm}m
        </Typography>
      </View>
    </View>
  );
}
