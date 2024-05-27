import { ScrollView, View } from "react-native";
import useSchedule from "../../context/schedule/useSchedule";
import ActivityCard from "./ActivityCard";
import { TopSpace, Typography } from "../../components";
import DoneCard from "./DoneCard";
import TabHeader from "../../container/Nav/TabHeader";

const occurrenceType = {
  daily: 0,
  weekly: 1,
  monthly: 2,
  yearly: 3,
};

export default function ChecklistScreen() {
  const { checklist } = useSchedule();

  const todo = checklist.filter((item) => item.remaining);
  const done = checklist.filter((item) => !item.remaining);

  return (
    <ScrollView>
      <TopSpace />
      <TabHeader />
      <View style={{ padding: 8 }}>
        <Typography type="header">To do</Typography>
      </View>

      {todo
        .sort((a, b) => a.remaining - b.remaining)
        .sort(
          (a, b) =>
            occurrenceType[a.occurrenceType] - occurrenceType[b.occurrenceType]
        )
        .map((item) => (
          <ActivityCard activity={item} key={item.id} />
        ))}
      <View style={{ padding: 8 }}>
        <Typography type="header">Completed</Typography>
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
      <View style={{ height: 200 }} />
    </ScrollView>
  );
}
