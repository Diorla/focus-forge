import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Schedule from "@/context/schedule/Schedule";
import Checklist from "@/context/schedule/Checklist";
import { format, secondsToHrMm } from "@/services/datetime";

export default function Range({
  activity,
  color,
}: {
  activity: Schedule | Checklist;
  color: string;
}) {
  const { startDate, archived, weeklyTarget, category } = activity;

  const endDate = archived ? format(archived, "date") : "Forever";
  const [hh, mm] = secondsToHrMm(weeklyTarget);

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <ThemedText style={{ textAlign: "center" }} color={color} type="caption">
        {category}
      </ThemedText>
      <ThemedText
        color={color}
        style={{ textAlign: "center", marginBottom: 8 }}
      >
        {format(startDate, "date")} - {endDate}
      </ThemedText>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <ThemedText
          color={color}
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          Weekly target:{" "}
        </ThemedText>
        <ThemedText
          color={color}
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          {hh}h {mm}m
        </ThemedText>
      </View>
    </View>
  );
}
