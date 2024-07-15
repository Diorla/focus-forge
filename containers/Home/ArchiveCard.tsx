import { TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { priority } from "@/constants/Priority";
import { ThemedView } from "@/components/ThemedView";
import ActivityModel from "@/context/data/model/ActivityModel";
import { format } from "@/services/datetime";
import TodoFormat from "./TodoFormat";
import TimeFormat from "@/components/TimeFormat";
import useUser from "@/context/user/useUser";

export default function ArchiveCard({ activity }: { activity: ActivityModel }) {
  const { theme } = useUser();
  const { archived, weeklyTarget, occurrence, occurrenceType, isOccurrence } =
    activity;
  const [visible, setVisible] = useState(false);
  const tasks = Object.keys(activity.tasks).filter(
    (item) => !activity.tasks[item].checked
  );

  return (
    <>
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
          <Link href={`/activity/${activity.id}`}>
            <ThemedText type="defaultSemiBold">{activity.name}</ThemedText>
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
          <ThemedText>Archived: {format(archived, "date")}</ThemedText>
        </ThemedView>
        <ThemedView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <ThemedText style={{ textTransform: "capitalize" }}>
            {priority[activity.priority] || "None"}
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
