import { ScrollView, View } from "react-native";
import Time from "./Time";
import { Card, Divider } from "@rneui/themed";
import Range from "./Range";
import Task from "./Task";
import History from "./History";
import PriorityLabel from "./PriorityLabel";
import Checked from "./Checked";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { getContrastColor } from "@/services/color";
import useSchedule from "@/context/schedule/useSchedule";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ActivityScreen({ id }: { id: string }) {
  const theme = useThemeColor();
  const { schedule, checklist } = useSchedule();
  const timedActivity = schedule.find((item) => item.id === id);

  if (timedActivity) {
    const color = getContrastColor(timedActivity.color);

    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: timedActivity.color, padding: 2 }}
      >
        <ThemedText type="title" color={color} style={{ textAlign: "center" }}>
          {timedActivity.name}
        </ThemedText>
        <Time activity={timedActivity} color={color} />
        <Range activity={timedActivity} color={color} />
        <PriorityLabel priority={timedActivity?.priority} />
        <Divider style={{ marginVertical: 8 }} />
        <ThemedText color={color}>{timedActivity.description}</ThemedText>
        <Card
          containerStyle={{
            backgroundColor: theme.background,
          }}
        >
          <Task activity={timedActivity} />
        </Card>
        <History activity={timedActivity} />
        <View style={{ height: 50 }} />
      </ScrollView>
    );
  }

  const activity = checklist.find((item) => item.id === id);

  if (activity) {
    const color = getContrastColor(activity.color);

    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: activity.color, padding: 2 }}
      >
        <ThemedText type="title" color={color} style={{ textAlign: "center" }}>
          {activity.name}
        </ThemedText>
        <Range activity={activity} color={color} />
        <PriorityLabel priority={activity?.priority} />
        <Divider style={{ marginVertical: 8 }} />
        <ThemedText color={color}>{activity.description}</ThemedText>
        <Card
          containerStyle={{
            backgroundColor: theme.background,
          }}
        >
          <Task activity={activity} />
        </Card>
        <Checked activity={activity} />
        <View style={{ height: 50 }} />
      </ScrollView>
    );
  }
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <ThemedText>Activity not found</ThemedText>
      <ThemedButton onPress={() => router.back()} title="Go back" />
    </View>
  );
}
