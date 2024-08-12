import useUser from "@/context/user/useUser";
import { Divider } from "@rneui/themed";
import { ThemedView } from "../ThemedView";
import ActivityModel from "@/context/data/model/ActivityModel";
import { secondsToHrMm } from "@/services/datetime";
import { ThemedText } from "../ThemedText";
import CardProps from "./CardProps";

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

export default function BrowserInfo({ item }: CardProps) {
  const { theme } = useUser();
  return (
    <ThemedView
      style={{
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <CardTime activity={item} />
      <Divider
        color={theme.grey5}
        style={{ width: "50%", marginVertical: 4 }}
      />
      <ThemedText type="defaultSemiBold">
        {item.archived ? "Archived" : "Active"}{" "}
      </ThemedText>
    </ThemedView>
  );
}
