import { ScrollView, View } from "react-native";
import { useState } from "react";
import { secondsToHrMm } from "../../services/datetime";
import { logError } from "../../services/database";
import { DailyQuota } from "../../context/user/UserModel";
import useUser from "@/context/user/useUser";
import AnimatedBackground from "../AnimatedBackground";
import TimeInput from "@/components/TimeInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";

function insertArray<type>(arr: type[], idx: number, value: type) {
  return [...arr.slice(0, idx), value, ...arr.slice(idx + 1)];
}
export function QuotaForm({ name }: { name: string }) {
  const theme = useThemeColor();
  const { createUser } = useUser();
  interface QuotaFormState {
    weeklyQuota: number;
    dailyQuota: DailyQuota;
    useWeeklyQuota: boolean;
  }

  const [quota, setQuota] = useState<QuotaFormState>({
    weeklyQuota: 0,
    dailyQuota: [0, 0, 0, 0, 0, 0, 0],
    useWeeklyQuota: true,
  });

  const [hh, mm] = secondsToHrMm(
    quota.dailyQuota.reduce((prev, next) => prev + next, 0)
  );

  const saveQuota = () => {
    const { weeklyQuota, dailyQuota, useWeeklyQuota } = quota;
    try {
      createUser({
        name,
        weeklyQuota,
        dailyQuota,
        useWeeklyQuota,
        id: "user",
        updatedAt: Date.now(),
        startTime: 0,
        createdAt: Date.now(),
      });
      router.push("/");
    } catch (error) {
      logError("Quotaform", "create user", error as Error);
    }
  };
  if (!quota.useWeeklyQuota)
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <AnimatedBackground
          prevColor={theme.primary}
          externalKey="secondary"
          color="secondary"
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            backgroundColor: "transparent",
          }}
        >
          <View style={{ height: 70 }} />
          <View>
            <View style={{ padding: 8 }}>
              <ThemedText
                type="title"
                style={{ textAlign: "center" }}
                color={theme.background}
              >
                Hi {name}, how much free time do you have on each day?
              </ThemedText>
              <ThemedText
                type="subtitle"
                style={{ textAlign: "center" }}
                color={theme.background}
              >
                {hh}h {String(mm).padStart(2, "0")}
              </ThemedText>
              <ScrollView
                style={{
                  height: 250,
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  padding: 8,
                  marginVertical: 20,
                }}
              >
                <ThemedText style={{ color: theme.background }}>
                  Sunday
                </ThemedText>
                <TimeInput
                  color={theme.background}
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
                />
                <ThemedText style={{ color: theme.background }}>
                  Monday
                </ThemedText>
                <TimeInput
                  color={theme.background}
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
                />
                <ThemedText style={{ color: theme.background }}>
                  Tuesday
                </ThemedText>
                <TimeInput
                  color={theme.background}
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
                />
                <ThemedText style={{ color: theme.background }}>
                  Wednesday
                </ThemedText>
                <TimeInput
                  color={theme.background}
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
                />
                <ThemedText style={{ color: theme.background }}>
                  Thursday
                </ThemedText>
                <TimeInput
                  color={theme.background}
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
                />
                <ThemedText style={{ color: theme.background }}>
                  Friday
                </ThemedText>
                <TimeInput
                  color={theme.background}
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
                />
                <ThemedText style={{ color: theme.background }}>
                  Saturday
                </ThemedText>
                <TimeInput
                  color={theme.background}
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
                />
              </ScrollView>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 8,
                marginBottom: 70,
              }}
            >
              <ThemedButton
                color={theme.background}
                title="Use weekly quota"
                onPress={() =>
                  setQuota({
                    ...quota,
                    useWeeklyQuota: !quota.useWeeklyQuota,
                  })
                }
              />
              <ThemedButton
                color={theme.background}
                title="Continue"
                disabled={!(hh + mm)}
                onPress={saveQuota}
              />
            </View>
          </View>
          <View />
        </View>
      </View>
    );
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AnimatedBackground
        prevColor={theme.primary}
        externalKey="secondary"
        color="secondary"
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          backgroundColor: "transparent",
        }}
      >
        <View style={{ alignItems: "center" }}></View>
        <View>
          <View style={{ padding: 8 }}>
            <ThemedText
              type="title"
              style={{ textAlign: "center", marginBottom: 40 }}
              color={theme.background}
            >
              Hi {name}, how much free time do you have in a week?
            </ThemedText>
            <TimeInput
              color={theme.background}
              value={quota.weeklyQuota}
              onChange={(weeklyQuota) =>
                setQuota({
                  ...quota,
                  weeklyQuota,
                })
              }
            />
          </View>
          <View
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
              color={theme.background}
            />

            <ThemedButton
              title="Continue"
              disabled={!quota.weeklyQuota}
              onPress={saveQuota}
              color={theme.background}
            />
          </View>
        </View>
        <View />
      </View>
    </View>
  );
}
