/* eslint-disable max-lines */
import * as React from "react";
import { CheckBox } from "@rneui/themed";
import { useState } from "react";
import useSchedule from "../../context/schedule/useSchedule";
import { useToast } from "react-native-toast-notifications";
import { ThemedText } from "@/components/ThemedText";
import TimeInput from "@/components/TimeInput";
import ThemedPicker from "@/components/ThemedPicker";
import ColorPicker from "@/components/ColorPicker";
import SelectCategory from "@/components/SelectCategory";
import { ThemedButton } from "@/components/ThemedButton";
import ThemedInput from "@/components/ThemedInput";
import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";
import createActivity from "@/services/database/createActivity";
import updateActivity from "@/services/database/updateActivity";
import { baseForm } from "./baseForm";
import { generateHourList } from "./generateHourList";
import handleError from "./handleError";
import ActivityModel from "@/context/data/model/ActivityModel";
import { OccurrenceType } from "@/context/data/model/ActivityModel";
import { baseErrorMSG } from "./baseErrorMSG";
import styles from "./styles";
import { occurrenceTypeList } from "./occurrenceTypeList";
import { priorityPickerList } from "./priorityPickerList";

export default function ActivityForm({
  initialForm = baseForm,
}: {
  initialForm?: ActivityModel;
}) {
  const { user, theme } = useUser();

  const mergedForm = {
    ...initialForm,
    userId: user.id,
  };

  const [form, setForm] = useState<ActivityModel>({ ...mergedForm });
  const { schedule } = useSchedule();
  const list = Array.from(new Set(schedule.map((item) => item.category)));
  const toast = useToast();

  const [errorMSG, setErrorMSG] = useState(baseErrorMSG);
  const saveActivity = () => {
    const errorMSG = handleError(form);
    if (errorMSG) return setErrorMSG(errorMSG);
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
    <ThemedView style={[styles.wrapper, { backgroundColor: theme.background }]}>
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
      <CheckBox
        checked={!form.isOccurrence}
        title="Use timer"
        onPress={() =>
          setForm({
            ...form,
            isOccurrence: !form.isOccurrence,
          })
        }
      />
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
                occurrenceType: occurrenceType as OccurrenceType,
              })
            }
            label="Occurrence"
            list={occurrenceTypeList}
          />
          <ThemedPicker
            value={String(form.occurrenceStart)}
            onValueChange={(occurrenceStart) =>
              setForm({
                ...form,
                occurrenceStart: Number(occurrenceStart),
              })
            }
            label="Start time"
            list={generateHourList()}
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
      {form.isOccurrence ? null : (
        <ThemedPicker
          value={String(form.priority)}
          onValueChange={(priority) =>
            setForm({
              ...form,
              priority: Number(priority),
            })
          }
          label="Priority"
          list={priorityPickerList}
        />
      )}
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
