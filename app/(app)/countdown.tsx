import { Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import goBack from "@/services/routing";
import { useEffect, useState } from "react";
import useUser from "@/context/user/useUser";
import Stopwatch from "@/components/Stopwatch";
import { Ionicons } from "@expo/vector-icons";
import ThemedPicker from "@/components/ThemedPicker";
import TaskTime from "@/components/Timer/Time";
import useSchedule from "@/context/schedule/useSchedule";
import { Link } from "expo-router";
import { ThemedButton } from "@/components/ThemedButton";
import updateUser from "@/services/database/updateUser";
import updateActivity from "@/services/database/updateActivity";
import { getDateTimeKey } from "@/services/datetime";
import Time from "@/components/Stopwatch/Time";
import { useToast } from "react-native-toast-notifications";

export default function CountdownScreen() {
  const [currentTaskId, setCurrentTaskId] = useState("");
  const { schedule } = useSchedule();
  const { user } = useUser();

  const toast = useToast();
  useEffect(() => {
    if (schedule.length) setCurrentTaskId(schedule[0].id);
  }, [schedule]);

  const currentTask = schedule.find((task) => task.id === currentTaskId);

  const endTimer = () => {
    if (!currentTask) return;
    const { done } = currentTask;
    const length = (Date.now() - user.startTime) / 1000;
    const datetime = getDateTimeKey(user.startTime);
    updateActivity({
      timerStart: 0,
      timerLength: 0,
      timerId: "",
      id: currentTaskId,
      done: {
        ...done,
        [datetime]: { comment: "", length },
      },
    });

    updateUser({
      ...user,
      startTime: 0,
    });

    toast.show(`${currentTask.name} updated`);
  };

  if (currentTask) {
    const { todayTime, upcomingTime, doneToday } = currentTask;

    return (
      <ParallaxScrollView name="time">
        <ThemedView style={{ alignItems: "center", flex: 1 }}>
          <ThemedText
            type="defaultSemiBold"
            style={{ textAlign: "center", marginTop: 48 }}
          >
            <Link href={`/activity/${currentTask.id}`}>
              {currentTask?.name}
            </Link>
          </ThemedText>
          <ThemedText style={{ textAlign: "center" }}>
            {currentTask?.description}
          </ThemedText>
          <TaskTime time={todayTime + upcomingTime - doneToday} />
          <ThemedView style={{ justifyContent: "center" }}>
            {user.startTime ? (
              <Stopwatch startTime={user.startTime} />
            ) : (
              <Time time={0} />
            )}
          </ThemedView>
          <ThemedView
            style={{ justifyContent: "space-evenly", alignItems: "center" }}
          >
            {user.startTime ? (
              <Ionicons
                name="stop-sharp"
                size={48}
                color="black"
                onPress={endTimer}
              />
            ) : (
              <Ionicons
                name="play"
                size={48}
                color="black"
                onPress={() => updateUser({ ...user, startTime: Date.now() })}
              />
            )}
          </ThemedView>
          <ThemedView style={{ marginVertical: 24 }} />
          <ThemedPicker
            labelStyle={{ marginLeft: 0 }}
            label="Select activity"
            value={currentTaskId}
            onValueChange={(value) => setCurrentTaskId(value)}
            list={schedule.map((item) => {
              return {
                label: item.name,
                value: item.id,
              };
            })}
          />
        </ThemedView>
        <ThemedView style={{ alignItems: "center", marginTop: 72 }}>
          <ThemedButton title="Close" onPress={() => goBack()} />
        </ThemedView>
      </ParallaxScrollView>
    );
  }
  return (
    <ParallaxScrollView name="time">
      <Pressable onPress={() => goBack()}>
        <ThemedText type="link">Close</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}
