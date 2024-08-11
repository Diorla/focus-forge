import { ThemedText } from "@/components/ThemedText";
import TimeFormat from "@/components/TimeFormat";
import useUser from "@/context/user/useUser";

export default function CompletedInfo({
  value,
  isOccurrence,
}: {
  value: number;
  isOccurrence: boolean;
}) {
  const { theme } = useUser();
  if (!isOccurrence) return <TimeFormat value={value} />;

  if (value) return <ThemedText color={theme.success}>Completed</ThemedText>;
  return <ThemedText color={theme.error}>Not done</ThemedText>;
}
