import { TouchableOpacity, View } from "react-native";
import { Card, Divider } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ActivityCard({
  schedule,
  type,
}: {
  schedule: Schedule;
  type: "completed" | "overflow" | "upcoming" | "previous" | "recent";
}) {
  const theme = useThemeColor();
  const { done, lastDone } = schedule;
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
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemedText style={{ textTransform: "capitalize" }}>
            {priority[schedule.priority] || "None"}
          </ThemedText>

          <TouchableOpacity onPress={() => setVisible(!visible)}>
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
