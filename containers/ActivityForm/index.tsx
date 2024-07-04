import * as React from "react";
import { TouchableOpacity } from "react-native";
import { CheckBox } from "@rneui/themed";
import { useState } from "react";
import { random } from "../../services/color";
import useSchedule from "../../context/schedule/useSchedule";
import { useToast } from "react-native-toast-notifications";
import ActivityModel from "../../context/data/model/ActivityModel";
import { ThemedText } from "@/components/ThemedText";
import TimeInput from "@/components/TimeInput";
import ThemedPicker from "@/components/ThemedPicker";
import ColorPicker from "@/components/ColorPicker";
import SelectCategory from "@/components/SelectCategory";
import { ThemedButton } from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedInput from "@/components/ThemedInput";
import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";
import createActivity from "@/services/database/createActivity";
import updateActivity from "@/services/database/updateActivity";

const baseForm: ActivityModel = {
  name: "",
  weeklyTarget: 0,
  dailyLimit: 0,
  startDate: Date.now(),
  priority: 0,
  color: random(),
  category: "",
  description: "",
  id: "",
  archived: 0,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  lastDone: 0,
  timerStart: 0,
  timerLength: 0,
  timerId: "",
  occurrence: 0,
  occurrenceType: "daily",
  done: {},
  tasks: {},
  isOccurrence: false,
  deletedAt: 0,
  userId: "",
};

export default function ActivityForm({
  initialForm = baseForm,
}: {
  initialForm?: ActivityModel;
}) {
  const {
    user: { id },
  } = useUser();

  const mergedForm = {
    ...initialForm,
    userId: id,
  };

  const theme = useThemeColor();
  const [form, setForm] = useState<ActivityModel>({ ...mergedForm });
  const { schedule } = useSchedule();
  const list = Array.from(new Set(schedule.map((item) => item.category)));
  const toast = useToast();

  const [errorMSG, setErrorMSG] = useState({
    name: "",
    weeklyTarget: "",
    dailyLimit: "",
    occurrence: "",
  });
  const saveActivity = () => {
    if (!form.name) {
      setErrorMSG({
        ...errorMSG,
        name: "Please provide a name",
      });
      return;
    }
    if (form.isOccurrence) {
      if (form.occurrence <= 0) {
        setErrorMSG({
          ...errorMSG,
          occurrence: "Please provide a valid number",
        });
        return;
      }
    } else {
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
    }
    try {
      if (initialForm?.id) {
        updateActivity({ ...form, id: initialForm.id }).then(() =>
          alert("Activity updated")
        );
      } else {
        createActivity(form)
          .then(() =>
            setForm({
              ...mergedForm,
              isOccurrence: form.isOccurrence,
              category: form.category,
              priority: form.priority,
            })
          )
          .then(() => toast.show("New activity added"));
      }
    } catch (error) {
      const { message } = error as Error;
      toast.show("Adding new activity failed: " + message);
    }
  };

  const daysToFinish = form.dailyLimit
    ? form.weeklyTarget / form.dailyLimit
    : 0;

  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        paddingTop: 20,
      }}
    >
      <ThemedInput
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
      <TouchableOpacity
        onPress={() =>
          setForm({
            ...form,
            isOccurrence: !form.isOccurrence,
          })
        }
      >
        <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox checked={!form.isOccurrence} />
          <ThemedText>Use timer</ThemedText>
        </ThemedView>
      </TouchableOpacity>
      {form.isOccurrence ? (
        <ThemedView
          style={{ borderColor: "silver", borderWidth: 1, margin: 4 }}
        >
          <ThemedInput
            keyboardType="numeric"
            label="How many times"
            value={String(form.occurrence)}
            onChangeText={(occurrence) =>
              setForm({
                ...form,
                occurrence: Number.isNaN(Number(occurrence))
                  ? 0
                  : Number(occurrence),
              })
            }
            errorMessage={errorMSG.occurrence}
          />
          <ThemedPicker
            value={form.occurrenceType}
            onValueChange={(occurrenceType) =>
              setForm({
                ...form,
                occurrenceType: occurrenceType as
                  | "daily"
                  | "weekly"
                  | "monthly"
                  | "yearly",
              })
            }
            label="Occurrence"
            list={[
              {
                label: "Daily",
                value: "daily",
              },
              {
                label: "Weekly",
                value: "weekly",
              },
              {
                label: "Monthly",
                value: "monthly",
              },
              {
                label: "Yearly",
                value: "yearly",
              },
            ]}
          />
        </ThemedView>
      ) : (
        <ThemedView
          style={{ borderColor: "silver", borderWidth: 1, margin: 4 }}
        >
          <TimeInput
            label="Weekly target"
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
          <TimeInput
            label="Daily limit"
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
          <ThemedView>
            {daysToFinish ? (
              <ThemedText style={{ paddingLeft: 8, marginBottom: 8 }}>
                {Math.ceil(daysToFinish)} days per week
              </ThemedText>
            ) : null}
          </ThemedView>
        </ThemedView>
      )}
      <ThemedPicker
        value={String(form.priority)}
        onValueChange={(priority) =>
          setForm({
            ...form,
            priority: Number(priority),
          })
        }
        label="Priority"
        list={[
          {
            label: "High",
            value: "3",
          },
          {
            label: "Medium",
            value: "2",
          },
          {
            label: "Low",
            value: "1",
          },
          {
            label: "None",
            value: "0",
          },
        ]}
      />
      <ThemedInput
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
        list={["None", ...list]}
      />
      <ThemedView style={{ marginBottom: 16, alignItems: "center" }}>
        <ThemedButton
          onPress={saveActivity}
          title={initialForm?.id ? "Update" : "Add"}
        />
      </ThemedView>
    </ThemedView>
  );
}
