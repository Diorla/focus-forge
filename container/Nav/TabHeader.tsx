import { View, TouchableOpacity, Modal } from "react-native";
import { Button, Typography } from "../../components";
import useUser from "../../context/user/useUser";
import { format, getDateTimeKey, secondsToHrMm } from "../../services/datetime";
import useNavigate from "./useNavigate";
import { FontAwesome5 } from "@expo/vector-icons";
import StopWatch from "../Timer/StopWatch";
import { useEffect, useState } from "react";
import useActivity from "../../context/activity/useActivity";
import Picker from "./Picker";
import { useToast } from "react-native-toast-notifications";

const StopWatchModal = () => {
  const { user, updateUser } = useUser();
  const { schedule = [], createDone } = useActivity();
  const running = !!user.startTime;
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState(schedule[0]?.id);
  const toast = useToast();

  const endTimer = (id: string, startTime: number) => {
    const key = getDateTimeKey(startTime);

    createDone({
      id: key,
      datetime: startTime,
      comment: "",
      activityId: id,
      length: (Date.now() - startTime) / 1000,
    });

    return updateUser({
      startTime: 0,
    });
  };

  useEffect(() => {
    if (!target) setTarget(schedule[0]?.id);
  }, [schedule.length]);

  function startStopWatch() {
    updateUser({
      startTime: Date.now(),
    });
  }

  const selected = schedule.find((item) => item.id === target);

  const {
    todayTime = 0,
    doneToday = 0,
    overflowTime = 0,
    upcomingTime = 0,
  } = selected || {};

  const [hh, mm, ss] = secondsToHrMm(
    todayTime - doneToday + overflowTime + upcomingTime
  );
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
          <Typography type="big">
            {String(hh).padStart(2, "0")}:{String(mm).padStart(2, "0")}:
            {String(ss).padStart(2, "0")}
          </Typography>
          <Typography type="small">This week</Typography>
          <View style={{ flexDirection: "row" }}>
            <Picker
              label=""
              value={target}
              onValueChange={(value) => setTarget(value)}
              list={schedule
                .sort((prev, next) => (prev.name > next.name ? 1 : -1))
                .map((item) => {
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
                if (running)
                  endTimer(target, user.startTime).then(() =>
                    toast.show("Timer ended", {
                      type: "success",
                    })
                  );
                else startStopWatch();
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
      <StopWatchModal />
    </View>
  );
}
