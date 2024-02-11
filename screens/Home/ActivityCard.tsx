import { TouchableOpacity, View } from "react-native";
import { TimeFormat, Typography } from "../../components";
import { format } from "../../services/datetime";
import { Card, Divider, useTheme } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import useNavigate from "../../container/Nav/useNavigate";
import Schedule from "../../context/activity/Schedule";
import dayjs from "dayjs";
import ChecklistModal from "../../container/ChecklistModal";
import { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const generateTime = (
  type: "completed" | "overflow" | "upcoming" | "previous" | "recent",
  schedule: Schedule
) => {
  if (type === "overflow") return schedule.overflowTime;
  if (type === "upcoming") return schedule.upcomingTime;
  if (type === "previous") return schedule.doneThisWeek;
  return schedule.doneToday;
};

const Info = ({
  type,
  done,
}: {
  type: "completed" | "overflow" | "upcoming" | "previous" | "recent";
  done: { [key: string]: number };
}) => {
  if (type === "completed" || type === "recent") {
    const doneList = Object.keys(done);
    const lastDone = doneList.sort(
      (a, b) => dayjs(b).valueOf() - dayjs(a).valueOf()
    )[0];
    const endTime = dayjs(lastDone).add(done[lastDone], "second");
    if (type === "completed") return <Typography>{format(endTime)}</Typography>;
    return <Typography>{dayjs(endTime).fromNow()}</Typography>;
  }
  if (type === "overflow") return <Typography>Over the limit</Typography>;
  if (type === "upcoming") return <Typography>Todo this week</Typography>;
  return <Typography>Done this week</Typography>;
};

export default function ActivityCard({
  schedule,
  type,
}: {
  schedule: Schedule;
  type: "completed" | "overflow" | "upcoming" | "previous" | "recent";
}) {
  const {
    theme: { colors },
  } = useTheme();
  const navigate = useNavigate<{ id: string }>();
  const { done } = schedule;
  const [visible, setVisible] = useState(false);
  const tasks = schedule.tasks.filter((item) => !item.checked);

  return (
    <>
      <ChecklistModal
        activity={schedule}
        visible={visible}
        closeModal={() => setVisible(false)}
      />
      <Card containerStyle={{ width: 300, borderRadius: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography>{schedule.name}</Typography>
          <MaterialCommunityIcons
            name="arrow-expand-all"
            size={24}
            color="black"
            onPress={() => navigate("Activity", { id: schedule.id })}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <TimeFormat value={generateTime(type, schedule)} />
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

          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="list" size={24} color="black" />
              <Typography>{tasks.length}</Typography>
            </View>
          </TouchableOpacity>
        </View>
      </Card>
    </>
  );
}
