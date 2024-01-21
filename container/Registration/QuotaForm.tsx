import { ScrollView, TouchableOpacity, View } from "react-native";
import AnimatedBackground from "../../AnimatedBackground";
import { useState } from "react";
import Typography from "../../components/typography";
import { useTheme } from "@rneui/themed";
import Button from "../../components/button";
import { DailyQuota } from "../../models/User";
import { TimeInput } from "../../components";
import { secondsToHrMm } from "../../services/datetime";
import { updateUser } from "../../services/database";
import useUser from "../../context/user/useUser";

function insertArray<type>(arr: type[], idx: number, value: type) {
  return [...arr.slice(0, idx), value, ...arr.slice(idx + 1)];
}
export function QuotaForm({ name }: { name: string }) {
  const {
    user: { id, email },
  } = useUser();
  interface QuotaFormState {
    weeklyQuota: number;
    dailyQuota: DailyQuota;
    useWeeklyQuota: boolean;
  }

  const [quota, setQuota] = useState<QuotaFormState>({
    weeklyQuota: 0,
    dailyQuota: [0, 0, 0, 0, 0, 0, 0],
    useWeeklyQuota: false,
  });

  const [hh, mm] = secondsToHrMm(
    quota.dailyQuota.reduce((prev, next) => prev + next, 0)
  );

  const {
    theme: { colors },
  } = useTheme();

  const saveQuota = () => {
    const { weeklyQuota, dailyQuota, useWeeklyQuota } = quota;

    updateUser({
      name,
      weeklyQuota,
      dailyQuota,
      useWeeklyQuota,
      id,
      registered: true,
      email,
    });
  };
  if (!quota.useWeeklyQuota)
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <AnimatedBackground
          prevColor={colors.primary}
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
              <Typography
                color={colors.white}
                type="header"
                style={{ textAlign: "center" }}
              >
                Hi {name}, how much free time do you have on each day?
              </Typography>
              <Typography
                color={colors.white}
                type="big"
                style={{ textAlign: "center", marginBottom: 40 }}
              >
                {hh}h {String(mm).padStart(2, "0")}
              </Typography>
              <ScrollView style={{ height: 250 }}>
                <Typography style={{ color: colors.white }}>Sunday</Typography>
                <TimeInput
                  color={colors.white}
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
                <Typography style={{ color: colors.white }}>Monday</Typography>
                <TimeInput
                  color={colors.white}
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
                <Typography style={{ color: colors.white }}>Tuesday</Typography>
                <TimeInput
                  color={colors.white}
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
                <Typography style={{ color: colors.white }}>
                  Wednesday
                </Typography>
                <TimeInput
                  color={colors.white}
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
                <Typography style={{ color: colors.white }}>
                  Thursday
                </Typography>
                <TimeInput
                  color={colors.white}
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
                <Typography style={{ color: colors.white }}>Friday</Typography>
                <TimeInput
                  color={colors.white}
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
                <Typography style={{ color: colors.white }}>
                  Saturday
                </Typography>
                <TimeInput
                  color={colors.white}
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
              <TouchableOpacity
                onPress={() =>
                  setQuota({
                    ...quota,
                    useWeeklyQuota: !quota.useWeeklyQuota,
                  })
                }
              >
                <Typography color={colors.white}>Use weekly quota</Typography>
              </TouchableOpacity>
              <Button block disabled={!(hh + mm)} onPress={saveQuota}>
                Continue
              </Button>
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
        prevColor={colors.primary}
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
            <Typography
              color={colors.white}
              type="header"
              style={{ textAlign: "center", marginBottom: 40 }}
            >
              Hi {name}, how much free time do you have in a week?
            </Typography>
            <TimeInput
              color={colors.white}
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
            <TouchableOpacity
              onPress={() =>
                setQuota({
                  ...quota,
                  useWeeklyQuota: !quota.useWeeklyQuota,
                })
              }
            >
              <Typography color={colors.white}>Use daily quota</Typography>
            </TouchableOpacity>
            <Button block disabled={!quota.weeklyQuota} onPress={saveQuota}>
              Continue
            </Button>
          </View>
        </View>
        <View />
      </View>
    </View>
  );
}
