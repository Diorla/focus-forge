import { logError } from "@/services/database";
import { schedulePushNotification } from "@/services/notification";
import endTimer from "@/services/utils/endTimer";
import startTimer from "@/services/utils/startTimer";
import dayjs from "dayjs";
import { Platform } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import Timer from "../Timer";
import useUser from "@/context/user/useUser";
import { useToast } from "react-native-toast-notifications";
import { secondsToHrMm } from "@/services/datetime";
import Schedule from "@/context/schedule/Schedule";
import * as Progress from "react-native-progress";
import dateRange from "@/components/ProjectCard/dateRange";
import PlayButton from "./PlayButton";

export default function TimeRunning({ schedule }: { schedule: Schedule }) {
  const { theme } = useUser();

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

  return (
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
            {hh}h {mm}m {ss}s
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
          } else {
            try {
              const timerId = String(Date.now());
              startTimer(id, todayTime - doneToday, timerId);
              const remaining = todayTime - doneToday;
              const now = dayjs();
              if (Platform.OS !== "web")
                schedulePushNotification(
                  {
                    title: `${schedule.name} ended`,
                    body: dateRange(now, now.add(remaining, "seconds")),
                    data: {
                      scheduleId: id,
                    },
                  },
                  remaining
                );
              toast.show("Timer started");
            } catch (error) {
              logError("today card", "starting timer", error as Error);
            }
          }
        }}
      />
    </ThemedView>
  );
}
