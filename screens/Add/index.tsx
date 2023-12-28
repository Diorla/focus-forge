import * as React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Button, TimeInput, Typography } from "../../components";
import { Input, useTheme } from "@rneui/themed";
import { useState } from "react";
import DatePicker from "../../components/datePicker";
import Picker from "../../components/picker";
import ColorPicker from "../../components/colorPicker";
import { random } from "../../services/color";
import SelectCategory from "../../components/selectCategory";
import Activity, { Priority } from "../../models/Activity";
import { createActivity } from "../../services/database";
import useUser from "../../context/user/useUser";

const baseForm: Activity = {
  name: "",
  weeklyTarget: 0,
  dailyLimit: 0,
  startDate: Date.now(),
  priority: "none",
  color: random(),
  category: "",
  description: "",
  id: "",
  archived: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  userId: "",
  done: {},
  tasks: [],
  lastDone: 0,
};
export default function AddScreen() {
  const { theme } = useTheme();
  const {
    user: { id },
  } = useUser();
  const [form, setForm] = useState<Activity>({ ...baseForm, userId: id });

  const [errorMSG, setErrorMSG] = useState({
    name: "",
    weeklyTarget: "",
    dailyLimit: "",
  });
  const saveActivity = () => {
    if (!form.name) {
      setErrorMSG({
        ...errorMSG,
        name: "Please provide a name",
      });
      return;
    }
    if (!form.weeklyTarget) {
      setErrorMSG({
        ...errorMSG,
        weeklyTarget: "Please provide a weekly target",
      });
      return;
    }
    if (!form.dailyLimit) {
      setErrorMSG({
        ...errorMSG,
        dailyLimit: "Please provide a daily limit",
      });
      return;
    }
    createActivity({
      ...form,
    }).then(() => {
      setForm({ ...baseForm, userId: id });
    });
  };

  const daysToFinish = form.dailyLimit
    ? form.weeklyTarget / form.dailyLimit
    : 0;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ backgroundColor: theme.colors.primary }}>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.white,
            marginTop: 80,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            paddingTop: 20,
          }}
        >
          <Input
            label="Name"
            value={form.name}
            onChangeText={(name) => setForm({ ...form, name })}
            onFocus={() =>
              setErrorMSG({
                ...errorMSG,
                name: "",
              })
            }
            errorMessage={errorMSG.name}
          />
          <Typography
            style={{
              marginLeft: 8,
              color: theme.colors.grey3,
              fontWeight: "bold",
            }}
          >
            Weekly target
          </Typography>
          <TimeInput
            value={form.weeklyTarget}
            onChange={(weeklyTarget) => setForm({ ...form, weeklyTarget })}
            errorMessage={errorMSG.weeklyTarget}
            onFocus={() =>
              setErrorMSG({
                ...errorMSG,
                weeklyTarget: "",
              })
            }
          />
          <Typography
            style={{
              marginLeft: 8,
              color: theme.colors.grey3,
              fontWeight: "bold",
            }}
          >
            Daily limit
          </Typography>
          <TimeInput
            value={form.dailyLimit}
            onChange={(dailyLimit) => setForm({ ...form, dailyLimit })}
            errorMessage={errorMSG.dailyLimit}
            onFocus={() =>
              setErrorMSG({
                ...errorMSG,
                dailyLimit: "",
              })
            }
          />
          {daysToFinish ? (
            <Typography style={{ paddingLeft: 8 }}>
              {Math.ceil(daysToFinish)} days per week
            </Typography>
          ) : null}
          <DatePicker
            date={form.startDate}
            setDate={(startDate) =>
              setForm({
                ...form,
                startDate,
              })
            }
            label="Start date"
          />
          <Picker
            value={form.priority}
            onValueChange={(priority) =>
              setForm({
                ...form,
                priority: priority as Priority,
              })
            }
            label="Priority"
            list={[
              {
                label: "High",
                value: "high",
              },
              {
                label: "Medium",
                value: "medium",
              },
              {
                label: "Low",
                value: "low",
              },
              {
                label: "None",
                value: "none",
              },
            ]}
          />
          <Input
            label="Description"
            multiline
            value={form.description}
            onChangeText={(description) => setForm({ ...form, description })}
          />
          <ColorPicker
            label="Color Picker"
            value={form.color}
            onValueChange={(color) => setForm({ ...form, color })}
          />
          <SelectCategory
            value={form.category || "None"}
            setValue={(category) => setForm({ ...form, category })}
            list={["None"]}
          />
          <View style={{ marginBottom: 16, alignItems: "center" }}>
            <Button onPress={saveActivity}>Add</Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
