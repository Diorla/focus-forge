import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { Card, useTheme } from "@rneui/themed";
import * as Progress from "react-native-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PlayButton from "./PlayButton";
import useNavigate from "../../container/Nav/useNavigate";
import Schedule from "../../context/activity/Schedule";
import Timer from "../../container/Timer";
import ChecklistModal from "../../container/ChecklistModal";
import { useState } from "react";
import { format, getDateTimeKey, secondsToHrMm } from "../../services/datetime";
import { useToast } from "react-native-toast-notifications";
import { schedulePushNotification } from "../../services/notification";
import { cancelScheduledNotificationAsync } from "expo-notifications";
import dayjs from "dayjs";
import useUser from "../../context/user/useUser";
import { AdShowOptions } from "react-native-google-mobile-ads";
import useActivity from "../../context/activity/useActivity";

export function TodayCard({
  schedule,
  isLoadedAd,
  showAd,
}: {
  schedule: Schedule;
  isLoadedAd: boolean;
  showAd: (arg?: AdShowOptions) => void;
}) {
  const {
    theme: { colors },
  } = useTheme();
  const { updateActivity, createDone } = useActivity();
  const { user } = useUser();

  const toast = useToast();
  const navigate = useNavigate<{ id: string }>();
  const [visible, setVisible] = useState(false);
  const {
    timerId,
    todayTime,
    id,
    name,
    doneToday = 0,
    timerStart,
    timerLength,
  } = schedule;

  const [hh, mm, ss] = secondsToHrMm(todayTime - doneToday);
  const running = !!timerId;
  const borderStyle = running
    ? { borderSize: 1, borderColor: colors.primary }
    : {};
  const tasks = schedule.tasks.filter((item) => !item.checked);
  const diff = dayjs().diff(user.createdAt, "day");

  const isPremium = diff < 21;

  const startTimer = (id: string, length: number, notificationId: string) => {
    return updateActivity(id, {
      timerStart: Date.now(),
      timerLength: length,
      timerId: notificationId,
    });
  };

  const endTimer = (id: string, startTime: number) => {
    const length = (Date.now() - startTime) / 1000;
    const key = getDateTimeKey(startTime);

    updateActivity(id, {
      timerStart: 0,
      timerLength: 0,
      timerId: "",
    });

    return createDone({
      id: key,
      datetime: startTime,
      comment: "",
      activityId: id,
      length,
    });
  };

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
              <Typography>
                {String(hh).padStart(2, "0")}:{String(mm).padStart(2, "0")}:
                {String(ss).padStart(2, "0")}
              </Typography>
              <Progress.Bar
                progress={doneToday / todayTime}
                color={colors.primary}
                unfilledColor={colors.grey5}
                borderColor={colors.grey0}
                width={250}
              />
            </>
          )}

          <PlayButton
            playing={running}
            onPress={() => {
              if (running) {
                endTimer(id, timerStart)
                  .then(() => toast.show("Timer paused"))
                  .then(() => isLoadedAd && !isPremium && showAd());
                cancelScheduledNotificationAsync(timerId);
              } else {
                schedulePushNotification(
                  {
                    title: `${name}`,
                    body: `Ended at ${format(Date.now() + todayTime * 1000)}`,
                    data: null,
                  },
                  todayTime - doneToday + 5
                ).then((notificationId) =>
                  startTimer(id, todayTime - doneToday, notificationId).then(
                    () => toast.show("Timer started")
                  )
                );
              }
            }}
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
