/* eslint-disable max-lines */
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Card, CheckBox, Input, useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Comment from "./Comment";
import generateHistoryHeader from "./generateHistoryHeader";
import DatePicker from "@/components/DateTimePicker";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import Confirm from "@/components/Confirm";
import DoneType from "@/context/data/types/DoneType";
import Checklist from "@/context/schedule/Checklist";
import {
  getDateKey,
  secondsToHrMm,
  format,
  getDateTimeKey,
} from "@/services/datetime";
import updateActivity from "@/services/database/updateActivity";
import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";
import HistoryModal from "@/components/ProjectCard/HistoryModal";
import { HistoryType } from "./HistoryType";

export default function CheckedHistory({ activity }: { activity: Checklist }) {
  const {
    theme: {
      colors: { success, error },
    },
  } = useTheme();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<{ [key: string]: HistoryType[] }>({});
  const { theme } = useUser();
  const { done = {} } = activity;
  const [expandIdx, setExpandIdx] = useState("");
  const [form, setForm] = useState<DoneType>({
    comment: "",
    datetime: Date.now(),
    length: 1,
  });

  const [showAddTime, setShowAddTime] = useState(false);

  useEffect(() => {
    const tempHistory: { [key: string]: HistoryType[] } = {};
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
      <HistoryModal
        activity={activity}
        visible={showAddTime}
        closeModal={() => setShowAddTime(!showAddTime)}
      />
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
                          transparent
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: 8,
                            alignItems: "center",
                          }}
                        >
                          <ThemedText color={time.length ? success : error}>
                            {time.length ? "Completed" : "Not done"}
                          </ThemedText>
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
                              <ThemedView>
                                <CheckBox
                                  checked={!!form.length}
                                  onPress={() => {
                                    setForm({
                                      ...form,
                                      length: form.length ? 0 : 1,
                                    });
                                  }}
                                  title="Completed"
                                  checkedIcon="dot-circle-o"
                                  uncheckedIcon="circle-o"
                                />
                              </ThemedView>
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
                                title="Save"
                              ></ThemedButton>
                              <ThemedButton
                                style={{ marginHorizontal: 8 }}
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
