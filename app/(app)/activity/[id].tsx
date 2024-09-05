import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ActivityScreen from "@/containers/Activity";
import ActivityModel from "@/context/data/model/ActivityModel";
import useDataQuery from "@/context/data/useDataQuery";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { getContrastColor } from "@/services/color";
import { ThemedButton } from "@/components/ThemedButton";
import goBack from "@/services/routing";
import { StatusBar } from "expo-status-bar";
import ActivityForm from "@/containers/ActivityForm";
import TopSpace from "@/components/TopSpace";
import ThemedModal from "@/components/ThemedModal";
import Menu from "./Menu";

export default function Activity() {
  const { id } = useLocalSearchParams();
  const { activityList } = useDataQuery();
  const [loading, setLoading] = useState(true);

  const [activity, setActivity] = useState<ActivityModel | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const activity = activityList.find((activity) => activity.id === id);
    if (activity) setActivity(activity);
    else setActivity(null);
    setLoading(false);
  }, [activityList, id]);

  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (activity?.id) {
    const color = getContrastColor(activity?.color);
    // 0 is part of black (#000000),
    // I didn't use white (f) because of capitalisation
    const statusBarStyle = color.includes("0") ? "dark" : "light";

    return (
      <ThemedView style={{ backgroundColor: activity.color, flex: 1 }}>
        <StatusBar style={statusBarStyle} />
        <TopSpace />
        <Menu toggleMenu={() => setShowEdit(!showEdit)} activity={activity} />
        <ScrollView>
          <ActivityScreen id={activity.id} />
          <ThemedModal visible={showEdit}>
            <ParallaxScrollView name="pencil">
              <ActivityForm initialForm={activity} />
              <ThemedView style={{ marginBottom: 16, alignItems: "center" }}>
                <ThemedButton
                  onPress={() => setShowEdit(!showEdit)}
                  title="Close"
                  style={{ marginBottom: 32 }}
                />
              </ThemedView>
            </ParallaxScrollView>
          </ThemedModal>
        </ScrollView>
      </ThemedView>
    );
  }
  return (
    <ParallaxScrollView name="alert-circle">
      <ThemedView style={{ padding: 8, alignItems: "center" }}>
        <ThemedText type="title">Activity not found</ThemedText>
        <ThemedText style={{ marginVertical: 12 }}>
          This activity has been deleted or some unknown error has occurred.
        </ThemedText>
        <ThemedButton title="Back" onPress={() => goBack()}></ThemedButton>
      </ThemedView>
    </ParallaxScrollView>
  );
}
