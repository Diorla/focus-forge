import { TouchableOpacity } from "react-native";
import { Card, Divider } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import ChecklistModal from "./ChecklistModal";
import { useState } from "react";
import generateCardTime from "./generateCardTime";
import CardInfo from "./CardInfo";
import dayjs from "dayjs";
import { ThemedText } from "@/components/ThemedText";
import TimeFormat from "@/components/TimeFormat";
import { Link } from "expo-router";
import Schedule from "@/context/schedule/Schedule";
import { priority } from "@/constants/Priority";
import { ThemedView } from "@/components/ThemedView";
import TodoFormat from "./TodoFormat";
import useUser from "@/context/user/useUser";

export default function ActivityCard({
  schedule,
  type,
}: {
  schedule: Schedule;
  type: "completed" | "overflow" | "upcoming" | "previous" | "recent";
}) {
  const { theme } = useUser();
  const {
    done,
    lastDone,
    isOccurrence,
    occurrence,
    occurrenceType,
    weeklyTarget,
  } = schedule;
  const [visible, setVisible] = useState(false);
  const tasks = Object.keys(schedule.tasks).filter(
    (item) => !schedule.tasks[item].checked
  );

  return (
    <>
      <ChecklistModal
        activity={schedule}
        visible={visible}
        closeModal={() => setVisible(false)}
      />
      <Card
        containerStyle={{
          width: 300,
          borderRadius: 8,
          backgroundColor: theme.background,
        }}
      >
        <ThemedView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Link href={`/activity/${schedule.id}`}>
            <ThemedText type="defaultSemiBold">{schedule.name}</ThemedText>
          </Link>
          {isOccurrence ? (
            <TodoFormat
              occurrence={occurrence}
              occurrenceType={occurrenceType}
            />
          ) : (
            <TimeFormat value={weeklyTarget} />
          )}
        </ThemedView>
        <ThemedView
          style={{
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <TimeFormat value={generateCardTime(type, schedule)} />
          <Divider
            color={theme.grey5}
            style={{ width: "50%", marginVertical: 4 }}
          />
          <CardInfo
            type={type}
            done={Object.keys(done).map((item) => {
              return {
                ...done[item],
                datetime: dayjs(item).valueOf(),
              };
            })}
            lastDone={lastDone}
          />
        </ThemedView>
        <ThemedView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <ThemedText style={{ textTransform: "capitalize" }}>
            {priority[schedule.priority] || "None"}
          </ThemedText>

          <TouchableOpacity onPress={() => setVisible(!visible)}>
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
