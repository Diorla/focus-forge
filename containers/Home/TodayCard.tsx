import { TouchableOpacity, View, useColorScheme } from "react-native";
import { Card } from "@rneui/themed";
import * as Progress from "react-native-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PlayButton from "./PlayButton";
import Schedule from "../../context/schedule/Schedule";
import { getDateTimeKey, secondsToHrMm } from "../../services/datetime";
import { useToast } from "react-native-toast-notifications";
import { logError } from "../../services/database";
import useDataQuery from "../../context/data/useDataQuery";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import Timer from "@/components/Timer";
import { useThemeColor } from "@/hooks/useThemeColor";
import updateActivity from "@/services/database/updateActivity";

const priority = ["None", "Low", "Medium", "High"];
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

  const startTimer = (id: string, length: number, notificationId: string) => {
    return updateActivity({
      id,
      timerStart: Date.now(),
      timerLength: length,
      timerId: notificationId,
    });
  };

  const endTimer = (id: string, startTime: number) => {
    const length = (Date.now() - startTime) / 1000;
    const key = getDateTimeKey(startTime);

    updateActivity({
      id,
      timerStart: 0,
      timerLength: 0,
      timerId: "",
      done: {
        ...done,
        [key]: {
          length,
          comment: "",
        },
      },
    });
  };

  return (
    <>
      <Card
        containerStyle={{
          borderRadius: 8,
          backgroundColor: theme.background,
          ...borderStyle,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemedText type="defaultSemiBold">{schedule.name}</ThemedText>
          <Link href={`/activity/${schedule.id}`}>
            <MaterialCommunityIcons
              name="arrow-expand-all"
              size={24}
              color={theme.text}
            />
          </Link>
        </View>
        <View
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
                color={theme.grey3}
                unfilledColor={theme.grey0}
                borderColor={theme.grey5}
                width={250}
              />
            </>
          )}

          <PlayButton
            playing={running}
            onPress={() => {
              if (running) {
                endTimer(id, timerStart);
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
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemedText style={{ textTransform: "capitalize" }}>
            {priority[schedule.priority] || "None"}
          </ThemedText>

          <TouchableOpacity onPress={() => setCurrentSchedule(schedule)}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="list" size={24} color={theme.text} />
              <ThemedText>{tasks.length}</ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </Card>
    </>
  );
}
