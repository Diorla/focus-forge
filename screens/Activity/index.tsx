import { useRoute } from "@react-navigation/native";
import { Typography } from "../../components";
import { ScrollView } from "react-native";
import useActivity from "../../context/activity/useActivity";

export default function ActivityScreen() {
  const { params } = useRoute();
  const { id = "" } = params as { id: string };
  const { schedule } = useActivity();
  const activity = schedule.find((item) => item.id === id);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: activity.color }}>
      <Typography>This is activity</Typography>
    </ScrollView>
  );
}
