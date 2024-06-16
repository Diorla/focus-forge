import * as React from "react";
import { Modal, ScrollView, View } from "react-native";
import { Input } from "@rneui/themed";
import { useState } from "react";
import useSchedule from "../../context/schedule/useSchedule";
import { useToast } from "react-native-toast-notifications";
import ActivityModel from "../../context/data/model/ActivityModel";
import { ThemedText } from "@/components/ThemedText";
import TimeInput from "@/components/TimeInput";
import Picker from "@/components/Picker";
import ColorPicker from "@/components/ColorPicker";
import SelectCategory from "@/components/SelectCategory";
import { ThemedButton } from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import updateActivity from "@/services/database/updateActivity";

export default function EditModal({
  activity,
  closeModal,
  visible,
}: {
  activity: ActivityModel;
  closeModal: () => void;
  visible: boolean;
}) {
  const theme = useThemeColor();
  const [form, setForm] = useState<ActivityModel>({ ...activity });
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
      updateActivity({
        ...form,
        id: activity.id,
      });
      toast.show("Activity updated");
      closeModal();
    } catch (error) {
      const { message } = error as Error;
      toast.show("Updating activity failed: " + message);
    }
  };

  const daysToFinish = form.dailyLimit
    ? form.weeklyTarget / form.dailyLimit
    : 0;

  return (
    <Modal visible={visible}>
      <ScrollView
        style={{
          backgroundColor: theme.background,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          paddingTop: 20,
          marginTop: 48,
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

        {form.isOccurrence ? (
          <View style={{ borderColor: "silver", borderWidth: 1, margin: 4 }}>
            <Input
              label="How many times"
              value={String(form.occurrence)}
              onChangeText={(occurrence) =>
                setForm({
                  ...form,
                  occurrence: Number(occurrence),
                })
              }
              errorMessage={errorMSG.occurrence}
            />
            <Picker
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
          </View>
        ) : (
          <View style={{ borderColor: "silver", borderWidth: 1, margin: 4 }}>
            <ThemedText
              style={{
                marginLeft: 8,
                color: theme.grey2,
                fontWeight: "bold",
              }}
            >
              Weekly target
            </ThemedText>
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
            <ThemedText
              style={{
                marginLeft: 8,
                color: theme.grey2,
                fontWeight: "bold",
              }}
            >
              Daily limit
            </ThemedText>
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
            <View>
              {daysToFinish ? (
                <ThemedText style={{ paddingLeft: 8, marginBottom: 8 }}>
                  {Math.ceil(daysToFinish)} days per week
                </ThemedText>
              ) : null}
            </View>
          </View>
        )}

        <Picker
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
          list={["None", ...list]}
        />
        <View style={{ marginBottom: 16, alignItems: "center" }}>
          <ThemedButton
            onPress={saveActivity}
            title="Update"
            style={{ marginVertical: 20 }}
          />
          <ThemedButton
            onPress={closeModal}
            title="Close"
            style={{ marginBottom: 32 }}
          />
        </View>
      </ScrollView>
    </Modal>
  );
}
