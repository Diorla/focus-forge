import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { format } from "../../services/date";
import { Card, Divider, useTheme } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import useNavigate from "../../container/Nav/useNavigate";
import secondsToHrMm from "../../services/date/minutesToHrMm";
import { Schedule } from "../../context/activity/getSchedule";
import dayjs from "dayjs";

const generateTime = (
  type: "completed" | "overflow" | "upcoming" | "previous",
  schedule: Schedule
) => {
  if (type === "completed") return schedule.doneToday;
  if (type === "upcoming") return schedule.upcomingTime;
  if (type === "previous") return schedule.doneThisWeek;
  return schedule.overflowTime;
};

const Info = ({
  type,
  done,
}: {
  type: "completed" | "overflow" | "upcoming" | "previous";
  done: { [key: string]: number };
}) => {
  if (type === "completed") {
    const doneList = Object.keys(done);
    const lastDone = doneList.sort(
      (a, b) => dayjs(b).valueOf() - dayjs(a).valueOf()
    )[0];
    return <Typography>{format(lastDone)}</Typography>;
  }
  if (type === "overflow") return <Typography>Over the limit</Typography>;
  if (type === "upcoming") return <Typography>Todo this week</Typography>;
  return <Typography>Done this week</Typography>;
};

export default function ActivityCard({
  showList,
  schedule,
  type,
}: {
  showList: () => void;
  schedule: Schedule;
  type: "completed" | "overflow" | "upcoming" | "previous";
}) {
  const {
    theme: { colors },
  } = useTheme();
  const navigate = useNavigate<{ title: string }>();
  const [hr, mm] = secondsToHrMm(generateTime(type, schedule));
  const { done } = schedule;

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
        <Info type={type} done={done} />
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
