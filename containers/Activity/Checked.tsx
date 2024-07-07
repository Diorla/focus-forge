import { ActivityIndicator, Modal, TouchableOpacity, View } from "react-native";
import { Card, Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Comment from "./Comment";
import generateHistoryHeader from "./generateHistoryHeader";
import DatePicker from "@/components/DateTimePicker";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import TimeInput from "@/components/TimeInput";
import Confirm from "@/components/Confirm";
import DoneType from "@/context/data/types/DoneType";
import Checklist from "@/context/schedule/Checklist";
import {
  getDateKey,
  secondsToHrMm,
  format,
  getDateTimeKey,
} from "@/services/datetime";
import { useThemeColor } from "@/hooks/useThemeColor";
import updateActivity from "@/services/database/updateActivity";
import { ThemedView } from "@/components/ThemedView";
import ThemedModal from "@/components/ThemedModal";

type History = {
  time: string;
  description: string;
  datetime: string;
  comment: string;
  length: number;
  id: string;
};

export default function Checked({ activity }: { activity: Checklist }) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<{ [key: string]: History[] }>({});
  const theme = useThemeColor();
  const { done = {} } = activity;
  const [expandIdx, setExpandIdx] = useState("");
  const [form, setForm] = useState<DoneType>({
    comment: "",
    datetime: Date.now(),
    length: 1,
  });
  const [editingComment, setEditingComment] = useState(false);

  const [newTime, setNewTime] = useState<DoneType>({
    comment: "",
    datetime: Date.now(),
    length: 1,
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
                    length: 1,
                  });
                }
              }}
              title="Save"
            />
            <ThemedButton
              onPress={() => setShowAddTime(false)}
              title="Cancel"
            />
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
        <ThemedButton onPress={() => setShowAddTime(true)} title="Add time" />
      </ThemedView>
      {Object.keys(history)
        ?.sort((a, b) => dayjs(b).valueOf() - dayjs(a).valueOf())
        .map((item) => {
          return (
            <ThemedView key={item}>
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
                              length: 1,
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
                        <Comment
                          showComment={expandIdx !== time.datetime}
                          comment={time.comment}
                        />
                        <ThemedView
                          style={{
                            justifyContent: "flex-end",
                            flexDirection: "row",
                            paddingVertical: 8,
                            alignItems: "center",
                          }}
                        >
                          <ThemedText>{time.time}</ThemedText>
                        </ThemedView>
                      </TouchableOpacity>
                      {expandIdx === time.datetime ? (
                        <ThemedView>
                          <ThemedView>
                            <ThemedView>
                              <Input
                                value={form.comment}
                                onChangeText={(comment) =>
                                  setForm({ ...form, comment })
                                }
                                multiline
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
                          </ThemedView>
                          <ThemedView
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
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
                                    length: 1,
                                  });
                                  setExpandIdx("");
                                }}
                                style={{ marginHorizontal: 8 }}
                                title="Save"
                              ></ThemedButton>
                              <ThemedButton
                                onPress={() => {
                                  setForm({
                                    comment: "",
                                    datetime: 0,
                                    length: 1,
                                  });
                                  setExpandIdx("");
                                }}
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
