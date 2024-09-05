import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { secondsToHrMm } from "@/services/datetime";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import QuotaFormState from "./QuotaFormState";
import insertArray from "./insertArray";
import { DailyQuota } from "@/context/user/UserModel";
import { DayInput } from "./DayInput";
import { days } from "./days";

export default function DailyQuotaForm({
  quota,
  setQuota,
  saveQuota,
}: {
  quota: QuotaFormState;
  setQuota: React.Dispatch<React.SetStateAction<QuotaFormState>>;
  saveQuota: () => void;
}) {
  const [hh, mm] = secondsToHrMm(
    quota.dailyQuota.reduce((prev, next) => prev + next, 0)
  );

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "transparent" }}>
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          backgroundColor: "transparent",
        }}
      >
        <ThemedView style={{ height: 70, backgroundColor: "transparent" }} />
        <ThemedView>
          <ThemedView style={{ padding: 8, backgroundColor: "transparent" }}>
            <ThemedText type="defaultSemiBold">
              Weekly free time: {hh}h {String(mm).padStart(2, "0")}
            </ThemedText>
            <ScrollView
              style={{
                margin: 8,
                padding: 8,
                maxHeight: 300,
                backgroundColor: "transparent",
              }}
              horizontal
            >
              {days.map((day, index) => (
                <DayInput
                  key={index}
                  value={quota.dailyQuota[index]}
                  label={day}
                  onChange={() => {
                    setQuota({
                      ...quota,
                      dailyQuota: insertArray(
                        quota.dailyQuota,
                        index,
                        quota.dailyQuota[index]
                      ) as DailyQuota,
                    });
                  }}
                />
              ))}
            </ScrollView>
          </ThemedView>
          <ThemedView
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 8,
            }}
          >
            <ThemedButton
              title="Use weekly quota"
              onPress={() =>
                setQuota({
                  ...quota,
                  useWeeklyQuota: !quota.useWeeklyQuota,
                })
              }
            />
            <ThemedButton
              title="Save"
              disabled={!(hh + mm)}
              onPress={saveQuota}
            />
          </ThemedView>
        </ThemedView>
        <ThemedView />
      </ThemedView>
    </ThemedView>
  );
}
