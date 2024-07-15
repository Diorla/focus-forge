import { useState } from "react";
import TimeInput from "@/components/TimeInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import updateUser from "@/services/database/updateUser";
import { DailyQuota } from "@/context/user/UserModel";
import { secondsToHrMm } from "@/services/datetime";
import { logError } from "@/services/database";
import useUser from "@/context/user/useUser";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { useToast } from "react-native-toast-notifications";

interface QuotaFormState {
  weeklyQuota: number;
  dailyQuota: DailyQuota;
  useWeeklyQuota: boolean;
  name: string;
}

function insertArray<type>(arr: type[], idx: number, value: type) {
  return [...arr.slice(0, idx), value, ...arr.slice(idx + 1)];
}

export default function QuotaForm() {
  const { user, theme } = useUser();
  const toast = useToast();

  const [quota, setQuota] = useState<QuotaFormState>({
    weeklyQuota: user.weeklyQuota,
    dailyQuota: user.dailyQuota,
    useWeeklyQuota: user.useWeeklyQuota,
    name: user.name,
  });

  const [hh, mm] = secondsToHrMm(
    quota.dailyQuota.reduce((prev, next) => prev + next, 0)
  );

  const saveQuota = () => {
    const { weeklyQuota, dailyQuota, useWeeklyQuota, name } = quota;
    try {
      updateUser({
        name,
        weeklyQuota,
        dailyQuota,
        useWeeklyQuota,
        id: user.id,
        updatedAt: Date.now(),
        startTime: 0,
        createdAt: Date.now(),
        registered: true,
      }).then(() => toast.show("Updated"));
    } catch (error) {
      logError("Quotaform", "create user", error as Error);
    }
  };

  if (!quota.useWeeklyQuota)
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
              >
                <TimeInput
                  value={quota.dailyQuota[0]}
                  onChange={(value) =>
                    setQuota({
                      ...quota,
                      dailyQuota: insertArray(
                        quota.dailyQuota,
                        0,
                        value
                      ) as DailyQuota,
                    })
                  }
                  label="Sunday"
                  containerStyle={{
                    marginHorizontal: 8,
                    borderWidth: 2,
                    minWidth: 150,
                    borderColor: theme.grey3,
                    borderRadius: 4,
                  }}
                />
                <TimeInput
                  value={quota.dailyQuota[1]}
                  onChange={(value) =>
                    setQuota({
                      ...quota,
                      dailyQuota: insertArray(
                        quota.dailyQuota,
                        1,
                        value
                      ) as DailyQuota,
                    })
                  }
                  label="Monday"
                  containerStyle={{
                    marginHorizontal: 8,
                    borderWidth: 2,
                    minWidth: 150,
                    borderColor: theme.grey3,
                    borderRadius: 4,
                  }}
                />
                <TimeInput
                  value={quota.dailyQuota[2]}
                  onChange={(value) =>
                    setQuota({
                      ...quota,
                      dailyQuota: insertArray(
                        quota.dailyQuota,
                        2,
                        value
                      ) as DailyQuota,
                    })
                  }
                  label="Tuesday"
                  containerStyle={{
                    marginHorizontal: 8,
                    borderWidth: 2,
                    minWidth: 150,
                    borderColor: theme.grey3,
                    borderRadius: 4,
                  }}
                />
                <TimeInput
                  value={quota.dailyQuota[3]}
                  onChange={(value) =>
                    setQuota({
                      ...quota,
                      dailyQuota: insertArray(
                        quota.dailyQuota,
                        3,
                        value
                      ) as DailyQuota,
                    })
                  }
                  label="Wednesday"
                  containerStyle={{
                    marginHorizontal: 8,
                    borderWidth: 2,
                    minWidth: 150,
                    borderColor: theme.grey3,
                    borderRadius: 4,
                  }}
                />
                <TimeInput
                  value={quota.dailyQuota[4]}
                  onChange={(value) =>
                    setQuota({
                      ...quota,
                      dailyQuota: insertArray(
                        quota.dailyQuota,
                        4,
                        value
                      ) as DailyQuota,
                    })
                  }
                  label="Thursday"
                  containerStyle={{
                    marginHorizontal: 8,
                    borderWidth: 2,
                    minWidth: 150,
                    borderColor: theme.grey3,
                    borderRadius: 4,
                  }}
                />
                <TimeInput
                  value={quota.dailyQuota[5]}
                  onChange={(value) =>
                    setQuota({
                      ...quota,
                      dailyQuota: insertArray(
                        quota.dailyQuota,
                        5,
                        value
                      ) as DailyQuota,
                    })
                  }
                  label="Friday"
                  containerStyle={{
                    marginHorizontal: 8,
                    borderWidth: 2,
                    minWidth: 150,
                    borderColor: theme.grey3,
                    borderRadius: 4,
                  }}
                />
                <TimeInput
                  value={quota.dailyQuota[6]}
                  onChange={(value) =>
                    setQuota({
                      ...quota,
                      dailyQuota: insertArray(
                        quota.dailyQuota,
                        6,
                        value
                      ) as DailyQuota,
                    })
                  }
                  label="Saturday"
                  containerStyle={{
                    marginHorizontal: 8,
                    borderWidth: 2,
                    minWidth: 150,
                    borderColor: theme.grey3,
                    borderRadius: 4,
                  }}
                />
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
