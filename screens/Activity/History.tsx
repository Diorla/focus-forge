import { Button, DatePicker, TimeInput, Typography } from "../../components";
import { ActivityIndicator, Modal, TouchableOpacity, View } from "react-native";
import { Card, Input, useTheme } from "@rneui/themed";
import Schedule from "../../context/schedule/Schedule";
import {
  format,
  getDateKey,
  getDateTimeKey,
  secondsToHrMm,
} from "../../services/datetime";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Comment from "./Comment";
import Confirm from "../../components/confirm";
import useDataQuery from "../../context/data/useDataQuery";
import DoneType from "../../context/data/types/DoneType";

type History = {
  time: string;
  description: string;
  datetime: string;
  comment: string;
  length: number;
  id: string;
};

const generateHistoryHeader = (date: string) => {
  if (dayjs(date).isToday()) return "Today";
  if (dayjs().diff(date, "day") === 1) return "Yesterday";
  return format(date, "date");
};
export default function History({ activity }: { activity: Schedule }) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<{ [key: string]: History[] }>({});
  const { theme } = useTheme();
  const { updateActivity } = useDataQuery();
  const { done = {} } = activity;
  const [expandIdx, setExpandIdx] = useState("");
  const [form, setForm] = useState<DoneType>({
    comment: "",
    datetime: Date.now(),
    length: 0,
  });
  const [editingComment, setEditingComment] = useState(false);

  const [newTime, setNewTime] = useState<DoneType>({
    comment: "",
    datetime: Date.now(),
    length: 0,
  });

  const [showAddTime, setShowAddTime] = useState(false);

  useEffect(() => {
    const tempHistory: { [key: string]: History[] } = {};
    Object.keys(done).forEach((item) => {
      const { comment, length } = done[item];
      const date = getDateKey(item);
      const [hr, mm] = secondsToHrMm(length);
      const obj = {
        time: format(item, "time"),
        description: `${hr}h ${String(mm).padStart(2, "0")}`,
        datetime: getDateTimeKey(item),
        comment: comment,
        length: length,
        id: item,
      };
      if (tempHistory[date]) {
        tempHistory[date].push(obj);
      } else {
        tempHistory[date] = [obj];
      }
    });
    setHistory(tempHistory);
    setLoading(false);
  }, [JSON.stringify(done)]);

  const createDone = (data: DoneType) => {
    const key = getDateTimeKey(data.datetime);
    updateActivity(activity.id, { done: { ...done, [key]: data } });
  };

  const updateDone = (key: string, data: DoneType) => {
    updateActivity(activity.id, { done: { ...done, [key]: data } });
  };

  const deleteDone = (key: string) => {
    const temp = { ...done };
    delete temp[key];
    updateActivity(activity.id, { done: temp });
  };

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
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
                if (newTime.length) {
                  createDone(newTime);
                  setShowAddTime(false);
                  setNewTime({
                    comment: "",
                    datetime: Date.now(),
                    length: 0,
                  });
                }
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
        ?.sort((a, b) => dayjs(b).valueOf() - dayjs(a).valueOf())
        .map((item) => {
          return (
            <View key={item}>
              <Typography type="header">
                {generateHistoryHeader(item)}
              </Typography>
              <View>
                {history[item]
                  ?.sort(
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
                              datetime: 0,
                              length: 0,
                            });
                          } else {
                            setForm({
                              comment: time.comment,
                              length: time.length,
                              datetime: dayjs(time.datetime).valueOf(),
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
                        comment={time.comment}
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
                                onPress={() => {
                                  const key = getDateTimeKey(form.datetime);
                                  updateDone(key, {
                                    ...form,
                                    datetime: form.datetime,
                                  });
                                  setForm({
                                    comment: "",
                                    datetime: 0,
                                    length: 0,
                                  });
                                  setExpandIdx(undefined);
                                }}
                              >
                                Save
                              </Button>
                              <Button
                                onPress={() => {
                                  setForm({
                                    comment: "",
                                    datetime: 0,
                                    length: 0,
                                  });
                                  setExpandIdx(undefined);
                                }}
                              >
                                Cancel
                              </Button>
                            </View>
                          </View>
                          <View>
                            <Confirm
                              title="Remove time"
                              message="Delete time from history"
                              acceptFn={() => {
                                const key = getDateTimeKey(form.datetime);
                                deleteDone(key);
                              }}
                              acceptTitle="Delete"
                            >
                              <Typography
                                style={{
                                  textAlign: "center",
                                  color: theme.colors.error,
                                }}
                              >
                                Delete
                              </Typography>
                            </Confirm>
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
