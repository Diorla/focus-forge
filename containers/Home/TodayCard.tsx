import { TouchableOpacity, View, useColorScheme } from "react-native";
import { Card } from "@rneui/themed";
import * as Progress from "react-native-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PlayButton from "./PlayButton";
import Schedule from "../../context/schedule/Schedule";
import { useToast } from "react-native-toast-notifications";
import { logError } from "../../services/database";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import Timer from "@/components/Timer";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";
import { secondsToHrMm } from "@/services/datetime";
import endTimer from "@/services/utils/endTimer";
import startTimer from "@/services/utils/startTimer";

export const priority = ["None", "Low", "Medium", "High"];
export function TodayCard({
  schedule,
  setCurrentSchedule,
}: {
  schedule: Schedule;
  setCurrentSchedule: any;
}) {
  const theme = useThemeColor();

  const toast = useToast();
  const {
    timerId,
    todayTime,
    id,
    doneToday = 0,
    timerStart,
    timerLength,
    done,
  } = schedule;

  const [hh, mm, ss] = secondsToHrMm(todayTime - doneToday);
  const running = !!timerId;
  const borderStyle = running
    ? { borderSize: 1, borderColor: theme.primary }
    : {};
  const tasks = Object.keys(schedule.tasks).filter(
    (item) => !schedule.tasks[item].checked
  );

  return (
    <>
      <Card
        containerStyle={{
          borderRadius: 8,
          backgroundColor: theme.background,
          ...borderStyle,
        }}
      >
        <ThemedView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <ThemedText type="defaultSemiBold">{schedule.name}</ThemedText>
          <Link href={`/activity/${schedule.id}`}>
            <MaterialCommunityIcons
              name="arrow-expand-all"
              size={24}
              color={theme.text}
            />
          </Link>
        </ThemedView>
        <ThemedView
          style={{
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          {timerId ? (
            <Timer
              targetTime={todayTime}
              startTime={timerStart}
              id={id}
              doneToday={doneToday}
              length={timerLength}
            />
          ) : (
            <>
              <ThemedText>
                {String(hh).padStart(2, "0")}:{String(mm).padStart(2, "0")}:
                {String(ss).padStart(2, "0")}
              </ThemedText>
              <Progress.Bar
                progress={doneToday / todayTime}
                color={theme.grey0}
                unfilledColor={theme.grey3}
                borderColor={theme.grey5}
                width={250}
              />
            </>
          )}

          <PlayButton
            playing={running}
            onPress={() => {
              if (running) {
                endTimer(id, timerStart, done);
                toast.show("Timer paused");
                // if (isLoadedAd && !isPremium) showAd();
              } else {
                try {
                  const timerId = String(Date.now());
                  startTimer(id, todayTime - doneToday, timerId);
                  toast.show("Timer started");
                } catch (error) {
                  logError("today card", "starting timer", error as Error);
                }
              }
            }}
          />
        </ThemedView>
        <ThemedView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <ThemedText style={{ textTransform: "capitalize" }}>
            {priority[schedule.priority] || "None"}
          </ThemedText>

          <TouchableOpacity onPress={() => setCurrentSchedule(schedule)}>
            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="list" size={24} color={theme.text} />
              <ThemedText>{tasks.length}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>
      </Card>
    </>
  );
}
