import { useNavigation, useRoute } from "@react-navigation/native";
import { Typography } from "../../components";
import { ScrollView } from "react-native";
import useActivity from "../../context/activity/useActivity";
import secondsToHrMm from "../../services/date/minutesToHrMm";
import { useEffect } from "react";

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
    const [hh, mm, ss] = secondsToHrMm(activity.weeklyTarget);
    return (
      <ScrollView style={{ flex: 1, backgroundColor: activity.color }}>
        <Typography>This is activity</Typography>
        <Typography>
          {hh}:{mm}:{ss}
        </Typography>
      </ScrollView>
    );
  }
}
