import useUser from "@/context/user/useUser";
import { Card } from "@rneui/themed";
import { ThemedView } from "../ThemedView";
import TopLeft from "./TopLeft";
import BottomLeft from "./BottomLeft";
import BottomRight from "./BottomRight";
import CardProps from "./CardProps";
import HistoryModal from "./HistoryModal";
import { useState } from "react";
import TopRight from "./TopRight";
import ChecklistModal from "./ChecklistModal";
import Center from "./Center";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function ActivityCard({ item, type }: CardProps) {
  const { theme } = useUser();
  const { isOccurrence, priority, occurrenceType, tasks, timerId } = item;
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [checklistModalVisible, setChecklistModalVisible] = useState(false);

  const uncompleted = Object.keys(tasks).filter((item) => !tasks[item].checked);
  const running = !!timerId;
  const borderStyle = running
    ? { borderSize: 1, borderColor: theme.primary }
    : {};

  return (
    <TouchableOpacity onPress={() => router.push(`/activity/${item.id}`)}>
      <Card
        containerStyle={{
          borderRadius: 8,
          backgroundColor: theme.background,
          minWidth: 240,
          ...borderStyle,
        }}
        wrapperStyle={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <HistoryModal
          activity={item}
          visible={timeModalVisible}
          closeModal={() => setTimeModalVisible(!timeModalVisible)}
        />
        <ChecklistModal
          activity={item}
          visible={checklistModalVisible}
          closeModal={() => setChecklistModalVisible(!checklistModalVisible)}
        />
        <ThemedView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <TopLeft name={item.name} />
          <TopRight
            item={item}
            type={type}
            toggleModal={() => setTimeModalVisible(!timeModalVisible)}
          />
        </ThemedView>
        <Center item={item} type={type} />
        <ThemedView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <BottomLeft
            isOccurrence={isOccurrence}
            priority={priority}
            occurrenceType={occurrenceType}
          />
          <BottomRight
            taskRemaining={uncompleted.length}
            toggleModal={() => setChecklistModalVisible(!timeModalVisible)}
          />
        </ThemedView>
      </Card>
    </TouchableOpacity>
  );
}
