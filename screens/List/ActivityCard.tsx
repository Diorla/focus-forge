import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { Card } from "@rneui/themed";
import { Octicons } from "@expo/vector-icons";
import { getContrastColor } from "../../services/color";
import useNavigate from "../../container/Nav/useNavigate";
import Schedule from "../../context/schedule/Schedule";
import { secondsToHrMm } from "../../services/datetime";

const getProgress = ({
  overflowTime,
  archived,
  weeklyTarget,
  totalDone,
}: {
  overflowTime: number;
  archived: number;
  weeklyTarget: number;
  totalDone: number;
}) => {
  /**
   * completed => weekly target > done
   * ongoing => weekly target < done && "no overflow"
   * ongoing => overflow
   * archived => archived = truthy
   */
  if (archived) return "Archived";
  if (overflowTime) return "Overflow";
  if (weeklyTarget > totalDone) return "Ongoing";
  return "Completed";
};
export default function ActivityCard({ activity }: { activity: Schedule }) {
  const {
    doneThisWeek,
    doneToday,
    weeklyTarget,
    overflowTime,
    archived,
    id,
    priority,
    category,
  } = activity;
  const bgColor = activity.color;
  const color = getContrastColor(bgColor);

  const navigate = useNavigate<{ id: string }>();
  const [hr, mm] = secondsToHrMm(weeklyTarget);

  const progress = ((doneToday + doneThisWeek) / weeklyTarget) * 100;
  let icon = null;
  if (priority === 3) icon = "chevron-up";
  if (priority === 2) icon = "dash";
  if (priority === 1) icon = "chevron-down";

  return (
    <TouchableOpacity onPress={() => navigate("Activity", { id })}>
      <Card containerStyle={{ backgroundColor: bgColor, borderRadius: 4 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography color={color} style={{ fontWeight: "bold" }}>
            {activity.name}{" "}
          </Typography>
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
          {icon && <Octicons name={icon} size={24} color={color} />}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ textTransform: "capitalize" }} color={color}>
              {category || "None"}
            </Typography>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
