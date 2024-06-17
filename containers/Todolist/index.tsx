import { ScrollView, View } from "react-native";
import useSchedule from "../../context/schedule/useSchedule";
import ActivityCard from "./ActivityCard";
import DoneCard from "./DoneCard";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

const occurrenceType = {
  daily: 0,
  weekly: 1,
  monthly: 2,
  yearly: 3,
};

export default function TodolistScreen() {
  const { checklist } = useSchedule();
  const theme = useThemeColor();

  const todo = checklist.filter((item) => item.remaining);
  const done = checklist.filter((item) => !item.remaining);
  const archived = checklist.filter((item) => item.archived);

  return (
    <ScrollView>
      <View style={{ padding: 8, marginTop: 12 }}>
        <ThemedText
          type="title"
          style={{
            textShadowColor: theme.background,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 4,
          }}
        >
          To do
        </ThemedText>
      </View>
      {todo
        .sort((a, b) => b.priority - a.priority)
        .sort((a, b) => b.remaining - a.remaining)
        .sort(
          (a, b) =>
            occurrenceType[a.occurrenceType] - occurrenceType[b.occurrenceType]
        )
        .map((item) => (
          <ActivityCard activity={item} key={item.id} />
        ))}
      <View style={{ padding: 8, marginVertical: 12 }}>
        <ThemedText
          type="title"
          style={{
            textShadowColor: theme.background,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 4,
          }}
        >
          Completed
        </ThemedText>
      </View>
      <ScrollView horizontal>
        {done
          .sort((a, b) => a.remaining - b.remaining)
          .sort(
            (a, b) =>
              occurrenceType[a.occurrenceType] -
              occurrenceType[b.occurrenceType]
          )
          .map((item) => (
            <DoneCard activity={item} key={item.id} />
          ))}
      </ScrollView>
      <View style={{ padding: 8, marginVertical: 12 }}>
        <ThemedText
          type="title"
          style={{
            textShadowColor: theme.background,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 4,
          }}
        >
          Archived
        </ThemedText>
      </View>
      <ScrollView horizontal>
        {archived
          .sort((a, b) => a.remaining - b.remaining)
          .sort(
            (a, b) =>
              occurrenceType[a.occurrenceType] -
              occurrenceType[b.occurrenceType]
          )
          .map((item) => (
            <DoneCard activity={item} key={item.id} />
          ))}
      </ScrollView>
    </ScrollView>
  );
}
