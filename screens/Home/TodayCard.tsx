import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { Card, useTheme } from "@rneui/themed";
import * as Progress from "react-native-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PlayButton from "./PlayButton";
import useNavigate from "../../container/Nav/useNavigate";
import secondsToHrMm from "../../services/date/minutesToHrMm";
import { Schedule } from "../../context/activity/getSchedule";

const Timer = () => <Typography>01</Typography>;
export function TodayCard({
  showList,
  togglePlay,
  schedule,
}: {
  showList: () => void;
  togglePlay: () => void;
  schedule: Schedule;
}) {
  const {
    theme: { colors },
  } = useTheme();
  const navigate = useNavigate<{ title: string }>();
  const { timer, todayTime, additionalTime, todayRemaining } = schedule;

  const [hh, mm, ss] = secondsToHrMm(todayRemaining + additionalTime);
  return (
    <Card containerStyle={{ borderRadius: 8 }}>
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
        {timer ? (
          <Timer />
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

        <PlayButton playing={!!timer} onPress={togglePlay} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography style={{ textTransform: "capitalize" }}>
          {schedule.priority}
        </Typography>

        <TouchableOpacity onPress={showList}>
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
