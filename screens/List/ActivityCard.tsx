import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { Card } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { getContrastColor } from "../../services/color";
import useNavigate from "../../container/Nav/useNavigate";
import secondsToHrMm from "../../services/date/minutesToHrMm";
import { Schedule } from "../../context/activity/getSchedule";

const getProgress = ({
  overflowTime,
  archived,
  weeklyTarget,
  totalDone,
}: {
  overflowTime: number;
  archived: boolean;
  weeklyTarget: number;
  totalDone: number;
}) => {
  /**
   * completed => weekly target > done
   * ongoing => weekly target < done && "no overflow"
   * ongoing => overflow
   * archived => archived = true
   */
  if (archived) return "Archived";
  if (overflowTime) return "Overflow";
  if (weeklyTarget > totalDone) return "Ongoing";
  return "Completed";
};
export default function ActivityCard({ activity }: { activity: Schedule }) {
  const { doneThisWeek, doneToday, weeklyTarget, overflowTime, archived } =
    activity;
  const bgColor = activity.color;
  const color = getContrastColor(bgColor);

  const navigate = useNavigate<{ color: string; bgColor: string }>();
  const [hr, mm] = secondsToHrMm(weeklyTarget);

  const progress = ((doneToday + doneThisWeek) / weeklyTarget) * 100;

  return (
    <TouchableOpacity onPress={() => navigate("Activity", { color, bgColor })}>
      <Card containerStyle={{ backgroundColor: bgColor, borderRadius: 4 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography color={color}>{activity.name}</Typography>
          <Typography color={color}>
            {hr}h {String(mm).padStart(2, "0")}
          </Typography>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <Typography color={color}>
            {getProgress({
              overflowTime,
              archived,
              weeklyTarget,
              totalDone: doneThisWeek + doneToday,
            })}
          </Typography>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography color={color}>{progress.toFixed(2)}%</Typography>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="list" size={24} color={color} />
            <Typography color={color}>{activity.tasks?.length ?? 0}</Typography>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
