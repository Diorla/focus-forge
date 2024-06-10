import { TouchableOpacity, View } from "react-native";
import { Card, Divider } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { priority } from "@/constants/Priority";
import { useThemeColor } from "@/hooks/useThemeColor";
import ActivityModel from "@/context/data/model/ActivityModel";
import { secondsToHrMm } from "@/services/datetime";

const CardTime = ({ activity }: { activity: ActivityModel }) => {
  const { isOccurrence, occurrence, weeklyTarget, occurrenceType } = activity;
  const [h, m] = secondsToHrMm(weeklyTarget);
  const target = {
    daily: "per day",
    weekly: "per week",
    monthly: "per month",
    yearly: "per year",
  };
  if (isOccurrence)
    return (
      <ThemedText>
        {occurrence} times {target[occurrenceType]}
      </ThemedText>
    );
  return (
    <ThemedText>
      {h}h{m ? ` ${m}` : ""} per week
    </ThemedText>
  );
};
export default function ActivityCard({
  activity,
}: {
  activity: ActivityModel;
}) {
  const theme = useThemeColor();
  const [visible, setVisible] = useState(false);
  const tasks = Object.keys(activity.tasks).filter(
    (item) => !activity.tasks[item].checked
  );

  return (
    <Card
      containerStyle={{ borderRadius: 8, backgroundColor: theme.background }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ThemedText type="defaultSemiBold">{activity.name}</ThemedText>
        <Link href={`/activity/${activity.id}`}>
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
        <CardTime activity={activity} />
        <Divider
          color={theme.grey5}
          style={{ width: "50%", marginVertical: 4 }}
        />
        <ThemedText type="defaultSemiBold">
          {activity.archived ? "Archived" : "Active"}{" "}
        </ThemedText>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ThemedText style={{ textTransform: "capitalize" }}>
          {priority[activity.priority] || "None"}
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
  );
}
