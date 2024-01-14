import { View, TouchableOpacity, Modal } from "react-native";
import { Button, Typography } from "../../components";
import useUser from "../../context/user/useUser";
import { format } from "../../services/datetime";
import useNavigate from "./useNavigate";
import { FontAwesome5 } from "@expo/vector-icons";
import StopWatch from "../Timer/StopWatch";
import { useState } from "react";
import useActivity from "../../context/activity/useActivity";
import Picker from "./Picker";
import { startStopWatch } from "../../services/database";
import endStopWatch from "../../services/database/endStopWatch";

const ShowStopWatch = () => {
  const { user } = useUser();
  const { activities } = useActivity();
  const running = !!user.startTime;
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState(activities[0]?.id);

  return (
    <>
      <Modal visible={visible}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Picker
              label=""
              value={target}
              onValueChange={(value) => setTarget(value)}
              list={activities.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              })}
            />
          </View>
          <View style={{ marginVertical: 20 }}>
            {running ? (
              <StopWatch startTime={user.startTime} />
            ) : (
              <Typography>00:00:00</Typography>
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              onPress={() => {
                const activity = activities.find((item) => item.id === target);
                if (running)
                  endStopWatch({
                    userId: user.id,
                    activityId: target,
                    startTime: user.startTime,
                    done: activity.done,
                  }).then(() => setVisible(false));
                else startStopWatch(user.id);
              }}
            >
              {running ? "Stop" : "Start"}
            </Button>
            <Button onPress={() => setVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
      {running ? (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <StopWatch startTime={user.startTime} />
        </TouchableOpacity>
      ) : (
        <FontAwesome5
          name="stopwatch"
          size={27}
          color="black"
          onPress={() => setVisible(!visible)}
        />
      )}
    </>
  );
};

export default function TabHeader() {
  const {
    user: { name },
  } = useUser();

  const navigate = useNavigate();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => navigate("Profile")}
        style={{
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Typography type="big">{name}</Typography>
          <Typography>{format()}</Typography>
        </View>
      </TouchableOpacity>
      <ShowStopWatch />
    </View>
  );
}
