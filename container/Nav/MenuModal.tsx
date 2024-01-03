import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, View } from "react-native";
import { Button, Typography } from "../../components";
import { Schedule } from "../../context/activity/getSchedule";
import TopSpace from "../../components/topSpace";
import useNavigate from "./useNavigate";

export default function MenuModal({
  color,
  activity,
}: {
  color: string;
  activity: Schedule;
}) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate<{ id: string }>();
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
          {activity.name}
        </Typography>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Button
            type="clear"
            onPress={() => {
              navigate("EditActivity", { id: activity.id });
              setVisible(!visible);
            }}
          >
            Edit
          </Button>
          <Button type="clear">Archive</Button>
          <Button type="clear">Delete</Button>
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
