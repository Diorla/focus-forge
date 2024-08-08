import { ThemedButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import TimeInput from "@/components/TimeInput";
import QuotaFormState from "./QuotaFormState";

export default function WeeklyQuotaForm({
  quota,
  setQuota,
  saveQuota,
}: {
  quota: QuotaFormState;
  setQuota: React.Dispatch<React.SetStateAction<QuotaFormState>>;
  saveQuota: () => void;
}) {
  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: "transparent",
      }}
    >
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          backgroundColor: "transparent",
        }}
      >
        <ThemedView style={{ alignItems: "center" }}></ThemedView>
        <ThemedView>
          <ThemedView style={{ padding: 8 }}>
            <TimeInput
              value={quota.weeklyQuota}
              onChange={(weeklyQuota) =>
                setQuota({
                  ...quota,
                  weeklyQuota,
                })
              }
              label="Weekly free time"
            />
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
              title="Use daily quota"
              onPress={() =>
                setQuota({
                  ...quota,
                  useWeeklyQuota: !quota.useWeeklyQuota,
                })
              }
            />
            <ThemedButton
              title="Save"
              disabled={!quota.weeklyQuota}
              onPress={saveQuota}
            />
          </ThemedView>
        </ThemedView>
        <ThemedView />
      </ThemedView>
    </ThemedView>
  );
}
