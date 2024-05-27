import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Typography } from "../../components";
import { ScrollView, View } from "react-native";
import useSchedule from "../../context/schedule/useSchedule";
import { getContrastColor } from "../../services/color";
import Time from "./Time";
import { Card, Divider } from "@rneui/themed";
import Range from "./Range";
import Task from "./Task";
import History from "./History";
import PriorityLabel from "./PriorityLabel";
import Checked from "./Checked";

export default function ActivityScreen() {
  const { params } = useRoute();
  const { id = "" } = params as { id: string };
  const { schedule, checklist } = useSchedule();
  const timedActivity = schedule.find((item) => item.id === id);
  const { goBack } = useNavigation();

  if (timedActivity) {
    const color = getContrastColor(timedActivity.color);

    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: timedActivity.color, padding: 2 }}
      >
        <Time activity={timedActivity} color={color} />
        <Range activity={timedActivity} color={color} />
        <PriorityLabel priority={timedActivity?.priority} />
        <Divider style={{ marginVertical: 8 }} />
        <Typography color={color}>{timedActivity.description}</Typography>
        <Card>
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
        {/* <Time activity={activity} color={color} /> */}
        <Range activity={activity} color={color} />
        <PriorityLabel priority={activity?.priority} />
        <Divider style={{ marginVertical: 8 }} />
        <Typography color={color}>{activity.description}</Typography>
        <Card>
          <Task activity={activity} />
        </Card>
        <Checked activity={activity} />
        <View style={{ height: 50 }} />
      </ScrollView>
    );
  }
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Typography>Activity not found</Typography>
      <Button onPress={goBack}>Go back</Button>
    </View>
  );
}
