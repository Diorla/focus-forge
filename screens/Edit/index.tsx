import * as React from "react";
import { ScrollView, View } from "react-native";
import { Button, TimeInput, Typography } from "../../components";
import { Input, useTheme } from "@rneui/themed";
import { useState } from "react";
import Picker from "../../components/picker";
import ColorPicker from "../../components/colorPicker";
import SelectCategory from "../../components/selectCategory";
import { useNavigation, useRoute } from "@react-navigation/native";
import useSchedule from "../../context/schedule/useSchedule";
import KeyboardWrapper from "../../container/KeyboardWrapper";
import useDataQuery from "../../context/data/useDataQuery";
import ActivityModel from "../../context/data/model/ActivityModel";

export default function EditScreen() {
  const { theme } = useTheme();
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { id = "" } = params as { id: string };
  const { schedule } = useSchedule();
  const { updateActivity } = useDataQuery();
  const [form, setForm] = useState<ActivityModel>(
    schedule.find((item) => item.id === id)
  );
  const list = Array.from(new Set(schedule.map((item) => item.category)));

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

    updateActivity(form.id, form);
    goBack();
  };

  const daysToFinish = form.dailyLimit
    ? form.weeklyTarget / form.dailyLimit
    : 0;
  return (
    <KeyboardWrapper>
      <ScrollView style={{ backgroundColor: form.color }}>
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
          <View style={{ marginBottom: 64, alignItems: "center" }}>
            <Button onPress={saveActivity}>Save</Button>
          </View>
          <View style={{ height: 32 }} />
        </View>
      </ScrollView>
    </KeyboardWrapper>
  );
}
