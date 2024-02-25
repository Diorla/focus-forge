import { View } from "react-native";
import { Typography } from "../../components";
import TxtButton from "../../components/txtButton";
import { MaterialIcons } from "@expo/vector-icons";
import { TodayCard } from "./TodayCard";
import { useEffect, useState } from "react";
import useActivity from "../../context/activity/useActivity";
import { useInterstitialAd } from "react-native-google-mobile-ads";
import getAdsId from "../../services/utils/getAdsId";

const priority = ["high", "medium", "low", "none"];

export default function TodayView() {
  const [expanded, setExpanded] = useState(false);
  const { schedule } = useActivity();

  const { isLoaded, show, load } = useInterstitialAd(getAdsId("interstitial"), {
    keywords: schedule.map((item) => item.name),
  });

  useEffect(() => {
    load();
  }, [load]);
  const today = schedule
    .filter((item) => {
      const todo = item.todayTime - item.doneToday;
      return todo > 0.001 || item.timerLength;
    })
    .sort(
      (a, b) => priority.indexOf(a.priority) - priority.indexOf(b.priority)
    );

  if (today.length) {
    const runningActivity = today.find((item) => item.timerStart);
    const notRunning = today.filter((item) => item.id !== runningActivity?.id);
    const first = runningActivity ?? today[0];
    const rest = runningActivity ? notRunning : today.slice(1);

    return (
      <View style={{ marginVertical: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <Typography type="header">Today</Typography>
          {rest.length ? (
            <TxtButton onPress={() => setExpanded(!expanded)}>
              {expanded ? "Collapse" : "Expand"}
            </TxtButton>
          ) : null}
        </View>
        <View>
          <TodayCard schedule={first} isLoadedAd={isLoaded} showAd={show} />
          {expanded ? (
            <>
              {rest
                .sort((a, b) => {
                  if (b.timerStart) return 1;
                  if (a.timerStart) return -1;
                  return 0;
                })
                .map((item) => (
                  <TodayCard
                    key={item.id}
                    schedule={item}
                    isLoadedAd={isLoaded}
                    showAd={show}
                  />
                ))}
            </>
          ) : null}
        </View>
        {rest.length ? (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <MaterialIcons
              name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={36}
              color="black"
              onPress={() => setExpanded(!expanded)}
            />
          </View>
        ) : null}
      </View>
    );
  }
  return null;
}
