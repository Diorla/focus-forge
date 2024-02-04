import { Button, DatePicker, TimeInput, Typography } from "../../components";
import { Modal, TouchableOpacity, View } from "react-native";
import { Card, Input, useTheme } from "@rneui/themed";
import Schedule from "../../context/activity/Schedule";
import {
  format,
  getDateKey,
  getDateTimeKey,
  secondsToHrMm,
} from "../../services/datetime";
import { useState } from "react";
import dayjs from "dayjs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  addTime,
  deleteDoneTime,
  updateDoneInfo,
} from "../../services/database";

type History = {
  time: string;
  description: string;
  datetime: string;
  comment: string;
  length: number;
};

function Comment({
  showComment,
  comment,
}: {
  showComment: boolean;
  comment: string;
}) {
  if (showComment && comment)
    return <Typography type="small">{comment}</Typography>;
  return null;
}

export default function History({ activity }: { activity: Schedule }) {
  const { theme } = useTheme();
  const { done, doneComment = {} } = activity;
  const doneList = Object.keys(done);
  const [expandIdx, setExpandIdx] = useState("");
  const [form, setForm] = useState({
    comment: "",
    datetime: 0,
    length: 0,
  });
  const [editingComment, setEditingComment] = useState(false);

  const [newTime, setNewTime] = useState({
    comment: "",
    datetime: Date.now(),
    length: 0,
  });

  const [showAddTime, setShowAddTime] = useState(false);
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
      <Modal visible={showAddTime}>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <TimeInput
            value={newTime.length}
            onChange={(length) => setNewTime({ ...newTime, length })}
          />
          <Input
            label="Note"
            value={newTime.comment}
            onChangeText={(comment) => setNewTime({ ...newTime, comment })}
            multiline
          />
          <DatePicker
            date={newTime.datetime}
            setDate={(datetime) => setNewTime({ ...newTime, datetime })}
            label="Date time"
            mode="datetime"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onPress={() => {
                if (newTime.length)
                  addTime(activity, newTime).then(() => setShowAddTime(false));
              }}
            >
              Save
            </Button>
            <Button onPress={() => setShowAddTime(false)}>Cancel</Button>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography type="big" style={{ textAlign: "center", marginBottom: 4 }}>
          History
        </Typography>
        <Button onPress={() => setShowAddTime(true)}>Add time</Button>
      </View>
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
                      <Comment
                        showComment={expandIdx !== time.datetime}
                        comment={doneComment[time.datetime]}
                      />
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
                          <View>
                            <Button
                              color="error"
                              onPress={() =>
                                deleteDoneTime(activity, time.datetime)
                              }
                            >
                              Delete
                            </Button>
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
