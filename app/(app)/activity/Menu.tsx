import Confirm from "@/components/Confirm";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ActivityModel from "@/context/data/model/ActivityModel";
import { getContrastColor } from "@/services/color";
import deleteActivity from "@/services/database/deleteActivity";
import updateActivity from "@/services/database/updateActivity";
import goBack from "@/services/routing";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "@rneui/base";
import { useState } from "react";

export default function Menu({
  activity,
  toggleMenu,
}: {
  activity: ActivityModel;
  toggleMenu: () => void;
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const archiveActivity = () => {
    updateActivity({ archived: Date.now(), id: activity.id });
  };

  const unarchiveActivity = () => {
    updateActivity({ archived: 0, id: activity.id });
  };
  const archive = activity.archived ? unarchiveActivity : archiveActivity;

  const color = getContrastColor(activity?.color);

  return (
    <>
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
            <ThemedButton title="Edit" color={color} onPress={toggleMenu} />
            <ThemedButton
              title={activity.archived ? "Unarchive" : "Archive"}
              color={color}
              style={{ marginVertical: 12 }}
              onPress={archive}
            />
            <Confirm
              title="Delete"
              message="You can't undo this action. Perhaps you want to delete it."
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
    </>
  );
}
