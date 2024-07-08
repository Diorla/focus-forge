import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ActivityScreen from "@/containers/Activity";
import ActivityModel from "@/context/data/model/ActivityModel";
import useDataQuery from "@/context/data/useDataQuery";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getContrastColor } from "@/services/color";
import { ThemedButton } from "@/components/ThemedButton";
import { Divider } from "@rneui/themed";
import Confirm from "@/components/Confirm";
import deleteActivity from "@/services/database/deleteActivity";
import updateActivity from "@/services/database/updateActivity";
import goBack from "@/services/routing";
import { StatusBar } from "expo-status-bar";
import ActivityForm from "@/containers/ActivityForm";
import TopSpace from "@/components/TopSpace";
import ThemedModal from "@/components/ThemedModal";

export default function Activity() {
  const { id } = useLocalSearchParams();
  const { activityList } = useDataQuery();
  const [loading, setLoading] = useState(true);

  const [activity, setActivity] = useState<ActivityModel | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const activity = activityList.find((activity) => activity.id === id);
    if (activity) setActivity(activity);
    else setActivity(null);
    setLoading(false);
  }, [JSON.stringify(activityList)]);

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
    const archiveActivity = () => {
      updateActivity({ archived: Date.now(), id: activity.id });
    };

    const unarchiveActivity = () => {
      updateActivity({ archived: 0, id: activity.id });
    };
    const archive = activity.archived ? unarchiveActivity : archiveActivity;

    const color = getContrastColor(activity?.color);
    // 0 is part of black (#000000), I didn't use white (f) because of capitalisation
    const statusBarStyle = color.includes("0") ? "dark" : "light";

    return (
      <ThemedView style={{ backgroundColor: activity.color, flex: 1 }}>
        <StatusBar style={statusBarStyle} />
        <TopSpace />
        <ThemedView
          style={{
            padding: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Ionicons
            name="arrow-back"
            size={36}
            color={color}
            onPress={() => goBack()}
          />
          <Ionicons
            name={showMenu ? "caret-down-circle" : "caret-up-circle"}
            size={48}
            color={color}
            onPress={() => setShowMenu(!showMenu)}
          />
        </ThemedView>
        {showMenu && (
          <ThemedView
            style={{ marginVertical: 8, backgroundColor: "transparent" }}
          >
            <ThemedView
              style={{ alignItems: "center", backgroundColor: "transparent" }}
            >
              <ThemedButton
                title="Edit"
                color={color}
                onPress={() => setShowEdit(!showEdit)}
              />
              <ThemedButton
                title={activity.archived ? "Unarchive" : "Archive"}
                color={color}
                style={{ marginVertical: 12 }}
                onPress={archive}
              />
              <Confirm
                title="Delete"
                message="You can't undo this action. Perhaps you want to archive it."
                acceptFn={() => deleteActivity(activity.id)}
                acceptTitle="Delete"
              >
                <ThemedText color={color} style={{ fontWeight: "600" }}>
                  Delete
                </ThemedText>
              </Confirm>
            </ThemedView>
            <Divider color={color} style={{ marginVertical: 12 }} />
          </ThemedView>
        )}
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
