import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { Card, useTheme } from "@rneui/themed";
import * as Progress from "react-native-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PlayButton from "./PlayButton";
import useNavigate from "../../container/Nav/useNavigate";
import { Schedule } from "../../context/activity/getSchedule";
import Timer from "../../container/Timer";
import startTimer from "../../services/database/startTimer";
import endTimer from "../../services/database/endTimer";
import ChecklistModal from "../../container/ChecklistModal";
import { useState } from "react";
import { secondsToHrMm } from "../../services/datetime";

export function TodayCard({ schedule }: { schedule: Schedule }) {
  const {
    theme: { colors },
  } = useTheme();
  const navigate = useNavigate<{ id: string }>();
  const [visible, setVisible] = useState(false);
  const {
    timer,
    todayTime,
    additionalTime,
    todayRemaining,
    id,
    done = {},
  } = schedule;

  const [hh, mm, ss] = secondsToHrMm(todayRemaining + additionalTime);
  const running = !!timer;
  const borderStyle = running
    ? { borderSize: 1, borderColor: colors.primary }
    : {};
  const tasks = schedule.tasks.filter((item) => !item.checked);
  return (
    <>
      <ChecklistModal
        activity={schedule}
        visible={visible}
        closeModal={() => setVisible(false)}
      />
      <Card containerStyle={{ borderRadius: 8, ...borderStyle }}>
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
          {timer ? (
            <Timer
              targetTime={todayRemaining}
              startTime={timer.startTime}
              todayTime={todayTime}
              todayRemaining={todayRemaining}
              id={id}
              done={done}
            />
          ) : (
            <>
              <Typography>
                {String(hh).padStart(2, "0")}:{String(mm).padStart(2, "0")}:
                {String(ss).padStart(2, "0")}
              </Typography>
              <Progress.Bar
                progress={(todayTime - todayRemaining) / todayTime}
                color={colors.primary}
                unfilledColor={colors.grey5}
                borderColor={colors.grey0}
                width={250}
              />
            </>
          )}

          <PlayButton
            playing={running}
            onPress={() =>
              running ? endTimer(id, timer.startTime, done) : startTimer(id)
            }
          />
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
