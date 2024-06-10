import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TodayCard } from "./TodayCard";
import { useState } from "react";
import useSchedule from "../../context/schedule/useSchedule";
// import { useInterstitialAd } from "react-native-google-mobile-ads";
// import getAdsId from "../../services/utils/getAdsId";
import ChecklistModal from "./ChecklistModal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import Schedule from "@/context/schedule/Schedule";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TodayView() {
  const [expanded, setExpanded] = useState(false);
  const { schedule } = useSchedule();
  const [currentSchedule, setCurrentSchedule] = useState<Schedule | null>(null);
  const theme = useThemeColor();

  // const { isLoaded, show, load } = useInterstitialAd(getAdsId("interstitial"), {
  //   keywords: schedule.map((item) => item.name),
  // });

  // useEffect(() => {
  //   load();
  // }, [load]);
  const today = schedule
    .filter((item) => {
      const todo = item.todayTime - item.doneToday;
      return todo > 0.001 || item.timerLength;
    })
    .sort((a, b) => a.priority - b.priority);

  if (today.length) {
    const runningActivity = today.find((item) => item.timerStart);
    const notRunning = today.filter((item) => item.id !== runningActivity?.id);
    const first = runningActivity ?? today[0];
    const rest = runningActivity ? notRunning : today.slice(1);

    return (
      <View style={{ marginVertical: 16 }}>
        {currentSchedule ? (
          <ChecklistModal
            activity={currentSchedule}
            visible={!!currentSchedule}
            closeModal={() => setCurrentSchedule(null)}
          />
        ) : null}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <ThemedText type="title">Today</ThemedText>
          {rest.length ? (
            <ThemedButton
              onPress={() => setExpanded(!expanded)}
              title={expanded ? "Collapse" : "Expand"}
            />
          ) : null}
        </View>
        <View>
          <TodayCard
            schedule={first}
            setCurrentSchedule={() => setCurrentSchedule(first)}
            // isLoadedAd={isLoaded}
            // showAd={show}
          />
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
                    setCurrentSchedule={() => setCurrentSchedule(item)}
                    // isLoadedAd={isLoaded}
                    // showAd={show}
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
              color={theme.text}
              onPress={() => setExpanded(!expanded)}
            />
          </View>
        ) : null}
      </View>
    );
  }
  return null;
}
