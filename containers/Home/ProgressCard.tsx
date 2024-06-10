import { View } from "react-native";
import { Card, Divider } from "@rneui/themed";
import * as Progress from "react-native-progress";
import useSchedule from "../../context/schedule/useSchedule";
import { secondsToHrMm } from "../../services/datetime";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ProgressCard() {
  const theme = useThemeColor();
  const {
    time: { doneToday, todoTime, taskDone, taskLeft },
  } = useSchedule();

  const ratio = doneToday / (doneToday + todoTime);
  const progress = Number.isNaN(ratio) ? 0 : ratio;

  const isCompleted = todoTime <= 0.0001;
  const value = isCompleted ? doneToday : todoTime;
  const [hr, mm] = secondsToHrMm(value);
  return (
    <Card
      containerStyle={{
        backgroundColor: theme.primary,
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Progress.Circle
          size={100}
          progress={progress}
          color={theme.background}
          unfilledColor={theme.grey5}
          borderColor={theme.grey5}
          showsText
          thickness={5}
          formatText={() => (progress * 100).toFixed(2) + "%"}
        />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <ThemedText type="title" color={theme.background}>
            Progress
          </ThemedText>
          <Divider style={{ marginVertical: 10 }} />
          <ThemedText color={theme.background}>
            {taskDone}/{taskDone + taskLeft} activities completed
          </ThemedText>
          <ThemedText color={theme.background}>
            {hr}h {String(mm).padStart(2, "0")}{" "}
            {isCompleted ? "done" : "remaining"}
          </ThemedText>
        </View>
      </View>
    </Card>
  );
}
