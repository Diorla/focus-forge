import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Timer from "@/components/Timer";
import Schedule from "@/context/schedule/Schedule";
import { useThemeColor } from "@/hooks/useThemeColor";
import { secondsToHrMm } from "@/services/datetime";
import React from "react";
import * as Progress from "react-native-progress";
import PlayButton from "../Home/PlayButton";
import { logError } from "@/services/database";
import { useToast } from "react-native-toast-notifications";
import endTimer from "@/services/utils/endTimer";
import startTimer from "@/services/utils/startTimer";
import dayjs from "dayjs";
import { Platform } from "react-native";
import { schedulePushNotification } from "@/services/notification";
import { dateRange } from "../Home/TodayCard";

export default function Running({ activity }: { activity: Schedule }) {
  const { timerId, todayTime, timerStart, id, doneToday, timerLength, name } =
    activity;
  const theme = useThemeColor();
  const [hh, mm, ss] = secondsToHrMm(todayTime - doneToday);
  const running = !!timerId;
  const toast = useToast();

  const todayRemaining = todayTime - doneToday;
  if (!todayRemaining) return null;
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
            endTimer(id, timerStart, activity.done);
            toast.show("Timer paused");
            // if (isLoadedAd && !isPremium) showAd();
          } else {
            try {
              const timerId = String(Date.now());
              startTimer(id, todayTime - doneToday, timerId);
              const remaining = todayTime - doneToday;
              const now = dayjs();
              if (Platform.OS !== "web")
                schedulePushNotification(
                  {
                    title: `${name} ended`,
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
