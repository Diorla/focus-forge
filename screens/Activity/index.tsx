import { useNavigation, useRoute } from "@react-navigation/native";
import { Typography } from "../../components";
import { ScrollView, View } from "react-native";
import useActivity from "../../context/activity/useActivity";
import { useEffect } from "react";
import { getContrastColor } from "../../services/color";
import Time from "./Time";
import { Divider } from "@rneui/themed";
import Range from "./Range";
import Task from "./Task";
import History from "./History";
import PriorityLabel from "./PriorityLabel";

export default function ActivityScreen() {
  const { params } = useRoute();
  const { id = "" } = params as { id: string };
  const { schedule } = useActivity();
  const activity = schedule.find((item) => item.id === id);
  const { goBack } = useNavigation();

  useEffect(() => {
    if (!activity?.id) goBack();
  }, [activity?.id]);

  if (activity) {
    const color = getContrastColor(activity.color);

    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: activity.color, padding: 2 }}
      >
        <Time activity={activity} color={color} />
        <Range activity={activity} color={color} />
        <PriorityLabel priority={activity?.priority} />
        <Divider style={{ marginVertical: 8 }} />
        <Typography color={color}>{activity.description}</Typography>
        <Task activity={activity} />
        <History activity={activity} />
        <View style={{ height: 50 }} />
      </ScrollView>
    );
  }
}
