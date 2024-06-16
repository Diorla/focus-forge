import { ActivityIndicator, Modal, TouchableOpacity, View } from "react-native";
import { Card, Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Comment from "./Comment";
import generateHistoryHeader from "./generateHistoryHeader";
import TimeInput from "@/components/TimeInput";
import DatePicker from "@/components/DateTimePicker";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import Confirm from "@/components/Confirm";
import DoneType from "@/context/data/types/DoneType";
import Schedule from "@/context/schedule/Schedule";
import {
  getDateKey,
  secondsToHrMm,
  format,
  getDateTimeKey,
} from "@/services/datetime";
import { useThemeColor } from "@/hooks/useThemeColor";
import updateActivity from "@/services/database/updateActivity";

type History = {
  time: string;
  description: string;
  datetime: string;
  comment: string;
  length: number;
  id: string;
};

export default function History({ activity }: { activity: Schedule }) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<{ [key: string]: History[] }>({});
  const theme = useThemeColor();
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
    updateActivity({ id: activity.id, done: { ...done, [key]: data } });
  };

  const updateDone = (key: string, data: DoneType) => {
    updateActivity({ id: activity.id, done: { ...done, [key]: data } });
  };

  const deleteDone = (key: string) => {
    const temp = { ...done };
    delete temp[key];
    updateActivity({ id: activity.id, done: temp });
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
    <Card
      containerStyle={{
        backgroundColor: theme.background,
      }}
    >
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
            <ThemedButton
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
              style={{ marginHorizontal: 8 }}
              title="Save"
            ></ThemedButton>
            <ThemedButton
              onPress={() => setShowAddTime(false)}
              style={{ marginHorizontal: 8 }}
              title="Cancel"
            ></ThemedButton>
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
        <ThemedText
          type="subtitle"
          style={{ textAlign: "center", marginBottom: 4 }}
        >
          History
        </ThemedText>
        <ThemedButton
          onPress={() => setShowAddTime(true)}
          title="Add time"
        ></ThemedButton>
      </View>
      {Object.keys(history)
        ?.sort((a, b) => dayjs(b).valueOf() - dayjs(a).valueOf())
        .map((item) => {
          return (
            <View key={item}>
              <ThemedText type="title">
                {generateHistoryHeader(item)}
              </ThemedText>
              <View>
                {history[item]
                  ?.sort(
                    (a, b) =>
                      dayjs(b.datetime).valueOf() - dayjs(a.datetime).valueOf()
                  )
                  .map((time, idx) => (
                    <View
                      style={{
                        backgroundColor: theme.grey5,
                        marginBottom: 4,
                        paddingVertical: 12,
                        paddingHorizontal: 8,
                      }}
                      key={idx}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if (expandIdx === time.datetime) {
                            setExpandIdx("");
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
                          <ThemedText>{time.time}</ThemedText>
                          <ThemedText>{time.description}</ThemedText>
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
                              color={theme.text}
                              onPress={() => setEditingComment(!editingComment)}
                            />

                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <ThemedButton
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
                                  setExpandIdx("");
                                }}
                                title="Save"
                              ></ThemedButton>
                              <ThemedButton
                                onPress={() => {
                                  setForm({
                                    comment: "",
                                    datetime: 0,
                                    length: 0,
                                  });
                                  setExpandIdx("");
                                }}
                                title="Cancel"
                              ></ThemedButton>
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
                              <ThemedText
                                style={{
                                  textAlign: "center",
                                  color: theme.error,
                                }}
                              >
                                Delete
                              </ThemedText>
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
