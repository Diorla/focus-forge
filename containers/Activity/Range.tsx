import { ThemedText } from "@/components/ThemedText";
import Schedule from "@/context/schedule/Schedule";
import Checklist from "@/context/schedule/Checklist";
import { format, secondsToHrMm } from "@/services/datetime";
import { ThemedView } from "@/components/ThemedView";

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
    <ThemedView
      style={{
        marginTop: 20,
        backgroundColor: "transparent",
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
      <ThemedView
        style={{
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
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
      </ThemedView>
    </ThemedView>
  );
}
