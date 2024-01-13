import { Typography } from "../../components";
import { View } from "react-native";
import { Schedule } from "../../context/activity/getSchedule";
import { format } from "../../services/datetime";

export default function Range({
  activity,
  color,
}: {
  activity: Schedule;
  color: string;
}) {
  const { startDate, archived } = activity;

  const endDate = archived ? format(archived, "date") : "Forever";

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Typography
        color={color}
        style={{ textAlign: "center", marginBottom: 8 }}
      >
        {format(startDate, "date")} - {endDate}
      </Typography>
    </View>
  );
}
