import useDataQuery from "@/context/data/useDataQuery";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import TopSpace from "../TopSpace";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useThemeColor } from "@/hooks/useThemeColor";

dayjs.extend(advancedFormat);

const greeting = (hour: number) => {
  if (hour < 12) {
    return "Good morning,";
  } else if (hour < 18) {
    return "Good afternoon,";
  } else {
    return "Good evening,";
  }
};

export default function TabHeader() {
  const theme = useThemeColor();
  const { time } = useDataQuery();
  return (
    <ThemedView
      style={{
        shadowColor: theme.text,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <TopSpace />
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 8,
        }}
      >
        <ThemedView>
          <ThemedText type="subtitle">
            {greeting(dayjs(time).hour())}
          </ThemedText>
          <ThemedText type="defaultSemiBold">
            {dayjs(time).format("ddd, MMM Do")}
          </ThemedText>
        </ThemedView>
        <Link href="countdown" asChild>
          <Ionicons name="time" size={36} color={theme.text} />
        </Link>
      </ThemedView>
    </ThemedView>
  );
}
