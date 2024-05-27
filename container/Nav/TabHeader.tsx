import { View, TouchableOpacity, Modal } from "react-native";
import { Button, Typography } from "../../components";
import { format, getDateTimeKey, secondsToHrMm } from "../../services/datetime";
import useNavigate from "./useNavigate";
import { FontAwesome5 } from "@expo/vector-icons";
import StopWatch from "../Timer/StopWatch";
import { useEffect, useState } from "react";
import useSchedule from "../../context/schedule/useSchedule";
import Picker from "./Picker";
import { useToast } from "react-native-toast-notifications";
import useDataQuery from "../../context/data/useDataQuery";

const StopWatchModal = () => {
  const { user, updateUser, updateActivity, activityList } = useDataQuery();
  const { schedule = [] } = useSchedule();
  const running = !!user.startTime;
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState(schedule[0]?.id);
  const toast = useToast();

  const endTimer = async (id: string, startTime: number) => {
    const key = getDateTimeKey(startTime);
    const activity = activityList.find((item) => item.id === id);

    updateActivity(activity.id, {
      done: {
        ...activity.done,
        [key]: {
          length: (Date.now() - startTime) / 1000,
          comment: "",
        },
      },
    });

    updateUser({
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
  } = useDataQuery();

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
