import { ActivityIndicator, TouchableOpacity } from "react-native";
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
import updateActivity from "@/services/database/updateActivity";
import { ThemedView } from "@/components/ThemedView";
import ThemedModal from "@/components/ThemedModal";
import useUser from "@/context/user/useUser";

type HistoryProps = {
  time: string;
  description: string;
  datetime: string;
  comment: string;
  length: number;
  id: string;
};

export default function History({ activity }: { activity: Schedule }) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<{ [key: string]: HistoryProps[] }>({});
  const { theme } = useUser();
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
    const tempHistory: { [key: string]: HistoryProps[] } = {};
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
  }, [done]);

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
    updateActivity({ ...activity, id: activity.id, done: temp }, false);
  };

  if (loading)
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  return (
    <Card
      containerStyle={{
        backgroundColor: theme.background,
      }}
    >
      <ThemedModal visible={showAddTime}>
        <ThemedView style={{ justifyContent: "center", flex: 1 }}>
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
          <ThemedView
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
          </ThemedView>
        </ThemedView>
      </ThemedModal>
      <ThemedView
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
      </ThemedView>
      {Object.keys(history)
        ?.sort((a, b) => dayjs(b).valueOf() - dayjs(a).valueOf())
        .map((item) => {
          return (
            <ThemedView key={item} style={{ marginBottom: 16 }}>
              <ThemedText type="title">
                {generateHistoryHeader(item)}
              </ThemedText>
              <ThemedView>
                {history[item]
                  ?.sort(
                    (a, b) =>
                      dayjs(b.datetime).valueOf() - dayjs(a.datetime).valueOf()
                  )
                  .map((time, idx) => (
                    <ThemedView
                      style={{
                        backgroundColor: theme.grey5,
                        marginBottom: 2,
                        paddingVertical: 4,
                        paddingHorizontal: 4,
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
                        <ThemedView
                          transparent
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: 8,
                            alignItems: "center",
                          }}
                        >
                          <ThemedText>{time.time}</ThemedText>
                          <ThemedText>{time.description}</ThemedText>
                        </ThemedView>
                      </TouchableOpacity>
                      <Comment
                        showComment={expandIdx !== time.datetime}
                        comment={time.comment}
                      />
                      {expandIdx === time.datetime ? (
                        <ThemedView>
                          <ThemedView>
                            {editingComment ? (
                              <Input
                                value={form.comment}
                                onChangeText={(comment) =>
                                  setForm({ ...form, comment })
                                }
                                multiline
                              />
                            ) : (
                              <ThemedView>
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
                              </ThemedView>
                            )}
                          </ThemedView>
                          <ThemedView
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

                            <ThemedView
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
                                style={{ marginHorizontal: 8 }}
                                title="Cancel"
                              ></ThemedButton>
                            </ThemedView>
                          </ThemedView>
                          <ThemedView>
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
                          </ThemedView>
                        </ThemedView>
                      ) : null}
                    </ThemedView>
                  ))}
              </ThemedView>
            </ThemedView>
          );
        })}
    </Card>
  );
}
