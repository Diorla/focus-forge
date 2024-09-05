import { ScrollView } from "react-native";
import Time from "./Time";
import { Card, Divider } from "@rneui/themed";
import Range from "./Range";
import History from "./History";
import PriorityLabel from "./PriorityLabel";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { getContrastColor } from "@/services/color";
import useSchedule from "@/context/schedule/useSchedule";
import goBack from "@/services/routing";
import { ThemedView } from "@/components/ThemedView";
import TodoFormat from "../Home/TodoFormat";
import useUser from "@/context/user/useUser";
import Checklist from "@/components/Checklist";

export default function ActivityScreen({ id }: { id: string }) {
  const { theme } = useUser();
  const { schedule, checklist } = useSchedule();
  const timedActivity = schedule.find((item) => item.id === id);

  if (timedActivity) {
    const color = getContrastColor(timedActivity.color);

    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: timedActivity.color, padding: 2 }}
      >
        <ThemedText
          type="title"
          color={color}
          style={{ textAlign: "center", backgroundColor: "transparent" }}
        >
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
          <Checklist activity={timedActivity} />
        </Card>
        <History activity={timedActivity} />
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
        <ThemedView transparent style={{ alignItems: "center" }}>
          <TodoFormat
            color={color}
            occurrence={activity.occurrence}
            occurrenceType={activity.occurrenceType}
          />
          <ThemedText color={color}>
            Remaining: {activity.remaining}x
          </ThemedText>
        </ThemedView>
        <Range activity={activity} color={color} />
        <Divider style={{ marginVertical: 8 }} />
        <ThemedText color={color}>{activity.description}</ThemedText>
        <Card
          containerStyle={{
            backgroundColor: theme.background,
          }}
        >
          <Checklist activity={activity} />
        </Card>
        <History activity={activity} />
      </ScrollView>
    );
  }
  return (
    <ThemedView
      style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
    >
      <ThemedText>Activity not found</ThemedText>
      <ThemedButton onPress={() => goBack()} title="Go back" />
    </ThemedView>
  );
}
