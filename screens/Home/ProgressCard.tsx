import { View } from "react-native";
import { Typography } from "../../components";
import { Card, Divider, useTheme } from "@rneui/themed";
import * as Progress from "react-native-progress";
import useActivity from "../../context/activity/useActivity";
import secondsToHrMm from "../../services/date/minutesToHrMm";

export default function ProgressCard() {
  const {
    theme: { colors },
  } = useTheme();
  const {
    time: { doneToday, todoTime, taskDone, taskLeft },
  } = useActivity();

  const ratio = doneToday / (doneToday + todoTime);
  const progress = Number.isNaN(ratio) ? 0 : ratio;

  const [hr, mm] = secondsToHrMm(todoTime);
  return (
    <Card
      containerStyle={{
        backgroundColor: colors.primary,
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Progress.Circle
          size={100}
          progress={progress}
          color={colors.grey5}
          unfilledColor={colors.grey0}
          borderColor={colors.grey0}
          showsText
          thickness={9}
          formatText={() => (progress * 100).toFixed(2) + "%"}
        />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Typography type="header" color={colors.white}>
            Progress
          </Typography>
          <Divider style={{ marginVertical: 10 }} />
          <Typography color={colors.white}>
            {taskDone}/{taskDone + taskLeft} activities completed
          </Typography>
          <Typography color={colors.white}>
            {hr}h {String(mm).padStart(2, "0")} remaining
          </Typography>
        </View>
      </View>
    </Card>
  );
}
