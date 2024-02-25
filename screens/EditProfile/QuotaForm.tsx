import { View } from "react-native";
import Typography from "../../components/typography";
import Button from "../../components/button";
import { TimeInput } from "../../components";
import { secondsToHrMm } from "../../services/datetime";
import { DailyQuota } from "../../services/db/schema/User/Model";

function insertArray<type>(arr: type[], idx: number, value: type) {
  return [...arr.slice(0, idx), value, ...arr.slice(idx + 1)];
}
type Quota = {
  weeklyQuota: number;
  useWeeklyQuota: boolean;
  dailyQuota: [number, number, number, number, number, number, number];
};

export function QuotaForm({
  form,
  setForm,
}: {
  form: Quota;
  setForm: (value: Quota) => void;
}) {
  const total = form.dailyQuota.reduce((prev, next) => prev + next, 0);
  const [hh, mm] = secondsToHrMm(total);

  if (form.useWeeklyQuota)
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            backgroundColor: "transparent",
          }}
        >
          <View style={{ alignItems: "center" }}></View>
          <View>
            <View>
              <Typography style={{ marginLeft: 8 }} type="label">
                Weekly quota
              </Typography>
              <TimeInput
                value={form.weeklyQuota}
                onChange={(weeklyQuota) =>
                  setForm({
                    ...form,
                    weeklyQuota,
                  })
                }
              />
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                flexDirection: "row",
              }}
            >
              <Button
                color="secondary"
                onPress={() =>
                  setForm({
                    ...form,
                    useWeeklyQuota: !form.useWeeklyQuota,
                  })
                }
              >
                Use daily quota
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
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          backgroundColor: "transparent",
        }}
      >
        <View>
          <View>
            <Typography style={{ marginLeft: 8 }} type="label">
              Daily quota
            </Typography>
            <Typography
              type="big"
              style={{ textAlign: "center", marginBottom: 40 }}
            >
              {hh}h {String(mm).padStart(2, "0")}
            </Typography>
            <View>
              <Typography>Sunday</Typography>
              <TimeInput
                value={form.dailyQuota[0]}
                onChange={(value) =>
                  setForm({
                    ...form,
                    dailyQuota: insertArray(
                      form.dailyQuota,
                      0,
                      value
                    ) as DailyQuota,
                  })
                }
              />
              <Typography>Monday</Typography>
              <TimeInput
                value={form.dailyQuota[1]}
                onChange={(value) =>
                  setForm({
                    ...form,
                    dailyQuota: insertArray(
                      form.dailyQuota,
                      1,
                      value
                    ) as DailyQuota,
                  })
                }
              />
              <Typography>Tuesday</Typography>
              <TimeInput
                value={form.dailyQuota[2]}
                onChange={(value) =>
                  setForm({
                    ...form,
                    dailyQuota: insertArray(
                      form.dailyQuota,
                      2,
                      value
                    ) as DailyQuota,
                  })
                }
              />
              <Typography>Wednesday</Typography>
              <TimeInput
                value={form.dailyQuota[3]}
                onChange={(value) =>
                  setForm({
                    ...form,
                    dailyQuota: insertArray(
                      form.dailyQuota,
                      3,
                      value
                    ) as DailyQuota,
                  })
                }
              />
              <Typography>Thursday</Typography>
              <TimeInput
                value={form.dailyQuota[4]}
                onChange={(value) =>
                  setForm({
                    ...form,
                    dailyQuota: insertArray(
                      form.dailyQuota,
                      4,
                      value
                    ) as DailyQuota,
                  })
                }
              />
              <Typography>Friday</Typography>
              <TimeInput
                value={form.dailyQuota[5]}
                onChange={(value) =>
                  setForm({
                    ...form,
                    dailyQuota: insertArray(
                      form.dailyQuota,
                      5,
                      value
                    ) as DailyQuota,
                  })
                }
              />
              <Typography>Saturday</Typography>
              <TimeInput
                value={form.dailyQuota[6]}
                onChange={(value) =>
                  setForm({
                    ...form,
                    dailyQuota: insertArray(
                      form.dailyQuota,
                      6,
                      value
                    ) as DailyQuota,
                  })
                }
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              flexDirection: "row",
            }}
          >
            <Button
              color="secondary"
              onPress={() =>
                setForm({
                  ...form,
                  useWeeklyQuota: !form.useWeeklyQuota,
                })
              }
            >
              Use weekly quota
            </Button>
          </View>
        </View>
        <View />
      </View>
    </View>
  );
}
