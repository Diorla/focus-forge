import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, View } from "react-native";
import { Button, Typography } from "../../components";
import Schedule from "../../context/schedule/Schedule";
import TopSpace from "../../components/topSpace";
import useNavigate from "./useNavigate";
import Confirm from "../../components/confirm";
import { useTheme } from "@rneui/themed";
import useSQLiteQuery from "../../context/sqlite/useSQLiteQuery";

export default function MenuModal({
  color,
  activity,
}: {
  color: string;
  activity: Schedule;
}) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate<{ id: string }>();
  const { updateActivity, deleteActivity } = useSQLiteQuery();
  const { theme } = useTheme();
  if (activity) {
    const { archived = "", id = "", name = "" } = activity;
    return (
      <>
        <MaterialCommunityIcons
          name="dots-grid"
          size={24}
          color={color}
          onPress={() => setVisible(!visible)}
        />
        <Modal visible={visible}>
          <TopSpace />
          <Typography style={{ textAlign: "center" }} type="header">
            {name}
          </Typography>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Button
              type="clear"
              onPress={() => {
                navigate("EditActivity", { id });
                setVisible(!visible);
              }}
            >
              Edit
            </Button>
            <Button
              type="clear"
              onPress={() =>
                archived
                  ? updateActivity(id, { archived: 0 })
                  : updateActivity(id, { archived: Date.now() })
              }
            >
              {archived ? "Unarchive" : "Archive"}
            </Button>
            <Confirm
              title="Delete activity"
              message="You cannot undo this action, do you want to proceed"
              acceptFn={() => {
                setVisible(false);
                deleteActivity(id);
              }}
              acceptTitle="Delete"
            >
              <Typography
                style={{
                  textAlign: "center",
                  color: theme.colors.error,
                }}
              >
                Delete
              </Typography>
            </Confirm>
          </View>
          <View style={{ marginBottom: 20, alignItems: "center" }}>
            <Button onPress={() => setVisible(!visible)} type="outline">
              Close
            </Button>
          </View>
        </Modal>
      </>
    );
  }
  return null;
}
