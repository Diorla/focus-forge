import { Button, TimeInput, Typography } from "../../components";
import { TouchableOpacity, View } from "react-native";
import { Card, Input, useTheme } from "@rneui/themed";
import { Schedule } from "../../context/activity/getSchedule";
import { format } from "../../services/date";
import getDateKey from "../../services/date/getDateKey";
import secondsToHrMm from "../../services/date/minutesToHrMm";
import { useState } from "react";
import dayjs from "dayjs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DatePicker from "../../components/datePicker";
import updateDoneInfo from "../../services/database/updateDoneInfo";
import getDateTimeKey from "../../services/date/getDateTimeKey";
import { MaterialIcons } from "@expo/vector-icons";
import deleteDoneTime from "../../services/database/deleteDoneTime";

type History = {
  time: string;
  description: string;
  datetime: string;
  comment: string;
  length: number;
};

export default function Done({ activity }: { activity: Schedule }) {
  const { theme } = useTheme();
  const { done, doneComment = {} } = activity;
  const doneList = Object.keys(done);
  const [expandIdx, setExpandIdx] = useState("");
  const [form, setForm] = useState({
    comment: "",
    datetime: 0,
    length: 0,
  });
  const [editingComment, setEditingComment] = useState(true);

  const history: { [key: string]: History[] } = {};
  doneList.forEach((datetime) => {
    const date = getDateKey(datetime);
    const length = done[datetime];
    const [hr, mm] = secondsToHrMm(length);
    if (history[date]) {
      history[date].push({
        time: format(datetime, "time"),
        description: `${hr}h ${String(mm).padStart(2, "0")}`,
        datetime,
        comment: doneComment[datetime] ?? "",
        length,
      });
    } else {
      history[date] = [
        {
          time: format(datetime, "time"),
          description: `${hr}h ${String(mm).padStart(2, "0")}`,
          datetime,
          comment: doneComment[datetime] ?? "",
          length,
        },
      ];
    }
  });

  return (
    <Card>
      <Typography type="big" style={{ textAlign: "center", marginBottom: 4 }}>
        History
      </Typography>
      {Object.keys(history)
        .sort((a, b) => dayjs(b).valueOf() - dayjs(a).valueOf())
        .map((item) => {
          return (
            <View key={item}>
              <Typography type="header">{format(item, "date")}</Typography>
              <View>
                {history[item]
                  .sort(
                    (a, b) =>
                      dayjs(b.datetime).valueOf() - dayjs(a.datetime).valueOf()
                  )
                  .map((time, idx) => (
                    <View
                      style={{
                        backgroundColor: theme.colors.grey5,
                        marginBottom: 4,
                        paddingVertical: 12,
                        paddingHorizontal: 8,
                      }}
                      key={idx}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if (expandIdx === time.datetime) {
                            setExpandIdx(undefined);
                            setForm({
                              comment: "",
                              length: 0,
                              datetime: 0,
                            });
                          } else {
                            const date = dayjs(time.datetime).format(
                              "YYYY-MM-DD"
                            );
                            const datetime = date + "T" + time.time + ":00";

                            setForm({
                              comment: time.comment,
                              length: time.length,
                              datetime: dayjs(datetime).valueOf(),
                            });
                            setExpandIdx(time.datetime);
                          }
                        }}
                      >
                        <View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: 8,
                            alignItems: "center",
                          }}
                        >
                          <Typography>{time.time}</Typography>
                          <Typography>{time.description}</Typography>
                        </View>
                      </TouchableOpacity>
                      {doneComment[time.datetime] &&
                      expandIdx !== time.datetime ? (
                        <Typography type="small">
                          {doneComment[time.datetime]}
                        </Typography>
                      ) : null}
                      {expandIdx === time.datetime ? (
                        <View>
                          <View>
                            {editingComment ? (
                              <Input
                                value={form.comment}
                                onChangeText={(comment) =>
                                  setForm({ ...form, comment })
                                }
                                multiline
                              />
                            ) : (
                              <View>
                                <TimeInput
                                  value={form.length}
                                  onChange={(length) =>
                                    setForm({ ...form, length })
                                  }
                                />
                                <DatePicker
                                  date={form.datetime}
                                  setDate={(datetime) =>
                                    setForm({ ...form, datetime })
                                  }
                                  label="Date time"
                                  mode="datetime"
                                />
                              </View>
                            )}
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <MaterialCommunityIcons
                              name={editingComment ? "timer" : "note-text"}
                              size={24}
                              color="black"
                              onPress={() => setEditingComment(!editingComment)}
                            />
                            <MaterialIcons
                              name="delete"
                              size={24}
                              color="black"
                              onPress={() =>
                                deleteDoneTime(activity, time.datetime)
                              }
                            />
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Button
                                onPress={() =>
                                  updateDoneInfo(activity, time.datetime, {
                                    ...form,
                                    datetime: getDateTimeKey(form.datetime),
                                  }).then(() => {
                                    setForm({
                                      comment: "",
                                      length: 0,
                                      datetime: 0,
                                    });
                                    setExpandIdx(undefined);
                                  })
                                }
                              >
                                Save
                              </Button>
                              <Button
                                onPress={() => {
                                  setForm({
                                    comment: "",
                                    length: 0,
                                    datetime: 0,
                                  });
                                  setExpandIdx(undefined);
                                }}
                              >
                                Cancel
                              </Button>
                            </View>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  ))}
              </View>
            </View>
          );
        })}
    </Card>
  );
}
