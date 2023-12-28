import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { format } from "../../services/date";
import { Card, Divider, useTheme } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import useNavigate from "../../container/Nav/useNavigate";
import secondsToHrMm from "../../services/date/minutesToHrMm";
import { Schedule } from "../../context/activity/getSchedule";

const generateTime = (
  type: "completed" | "overflow" | "upcoming",
  schedule: Schedule
) => {
  if (type === "completed") return schedule.doneToday;
  if (type === "upcoming") return schedule.upcomingTime;
  return schedule.overflowTime;
};

export default function ActivityCard({
  showList,
  schedule,
  type,
}: {
  showList: () => void;
  schedule: Schedule;
  type: "completed" | "overflow" | "upcoming";
}) {
  const {
    theme: { colors },
  } = useTheme();
  const navigate = useNavigate<{ title: string }>();
  const [hr, mm] = secondsToHrMm(generateTime(type, schedule));
  const { lastDone } = schedule;
  const info = lastDone ? format(lastDone) : "Never";
  return (
    <Card containerStyle={{ width: 300, borderRadius: 8 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography>{schedule.name}</Typography>
        <MaterialCommunityIcons
          name="arrow-expand-all"
          size={24}
          color="black"
          onPress={() => navigate("Activity", { title: "activity name" })}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Typography>
          {hr}h {mm}
        </Typography>
        <Divider
          color={colors.grey3}
          style={{ width: "50%", marginVertical: 4 }}
        />
        <Typography>{info}</Typography>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography style={{ textTransform: "capitalize" }}>
          {schedule.priority}
        </Typography>

        <TouchableOpacity disabled={!schedule.tasks.length} onPress={showList}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="list" size={24} color="black" />
            <Typography>{schedule.tasks.length}</Typography>
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
}
