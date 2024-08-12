import useUser from "@/context/user/useUser";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import CardProps from "./CardProps";
import TimeFormat from "../TimeFormat";

interface TopRightProps extends CardProps {
  toggleModal: () => void;
}

export default function TopRight({ item, type, toggleModal }: TopRightProps) {
  const { theme } = useUser();
  const { isOccurrence, occurrenceType, occurrence, weeklyTarget } = item;
  if (type === "todo")
    return (
      <Ionicons
        name="checkmark-done"
        size={24}
        color={theme.text}
        onPress={toggleModal}
      />
    );
  if (isOccurrence)
    return (
      <ThemedText>
        {occurrence}/{occurrenceType}
      </ThemedText>
    );
  return <TimeFormat value={weeklyTarget} />;
}
