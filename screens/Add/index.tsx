import * as React from "react";
import { ScrollView, View } from "react-native";
import { Button, TimeInput, Typography } from "../../components";
import { Input, useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import Picker from "../../components/picker";
import ColorPicker from "../../components/colorPicker";
import { random } from "../../services/color";
import SelectCategory from "../../components/selectCategory";
import useSchedule from "../../context/schedule/useSchedule";
import { useToast } from "react-native-toast-notifications";
import { useInterstitialAd } from "react-native-google-mobile-ads";
import getAdsId from "../../services/utils/getAdsId";
import dayjs from "dayjs";
import KeyboardWrapper from "../../container/KeyboardWrapper";
import ActivityModel from "../../context/data/model/ActivityModel";
import useDataQuery from "../../context/data/useDataQuery";

export default function AddScreen() {
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
  };
  const { theme } = useTheme();
  const {
    user: { createdAt },
  } = useDataQuery();
  const [form, setForm] = useState<ActivityModel>({ ...baseForm });
  const { schedule } = useSchedule();
  const { createActivity } = useDataQuery();
  const list = Array.from(new Set(schedule.map((item) => item.category)));
  const toast = useToast();
  const { isLoaded, show, load } = useInterstitialAd(getAdsId("interstitial"), {
    keywords: schedule.map((item) => item.name),
  });

  const diff = dayjs().diff(createdAt, "day");
  const isPremium = diff < 21;

  useEffect(() => {
    load();
  }, [load]);

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
    try {
      createActivity({
        ...form,
        id: Date.now().toString(),
      });
      setForm({ ...baseForm });
      toast.show("New activity added");
      isLoaded && !isPremium && show();
    } catch (error) {
      toast.show("Adding new activity failed: " + error.message);
    }
  };

  const daysToFinish = form.dailyLimit
    ? form.weeklyTarget / form.dailyLimit
    : 0;
  return (
    <KeyboardWrapper>
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
            <Typography style={{ paddingLeft: 8, marginBottom: 8 }}>
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
          <View style={{ marginBottom: 16, alignItems: "center" }}>
            <Button onPress={saveActivity}>Add</Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardWrapper>
  );
}
