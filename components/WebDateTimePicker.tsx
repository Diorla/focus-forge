import { Picker as RNPicker } from "@react-native-picker/picker";
import { useState } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import { ThemedView } from "./ThemedView";
import dayjs from "dayjs";
import ThemedModal from "./ThemedModal";
import useUser from "@/context/user/useUser";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from(
  { length: dayjs().year() - 1970 + 1 },
  (_, i) => i + 1970
);

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);
type Month = (typeof months)[number];

function getDaysInMonth(month: Month): number[] {
  const daysInMonth: { [key in Month]: number } = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  // Get the number of days in the given month
  const numberOfDays = daysInMonth[month];

  // Generate an array of days from 1 to numberOfDays
  const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  return daysArray;
}

const getDateInfo = (date: number) => {
  const dateObj = dayjs(date);
  const year = dateObj.year();
  const month = dateObj.month();
  const currentDate = dateObj.date();
  const hour = dateObj.hour();
  const minute = dateObj.minute();
  return { year, month, date: currentDate, hour, minute };
};
export default function WebDateTimePicker({
  value,
  onValueChange,
}: {
  value: number;
  onValueChange: (value: number) => void;
}) {
  const { theme } = useUser();
  const [showPicker, setShowPicker] = useState(false);
  const datetime = dayjs(value).format("DD MMM YYYY, HH:mm");

  const { year, month, date, hour, minute } = getDateInfo(value);

  return (
    <ThemedView>
      <ThemedView
        style={{
          alignItems: "flex-start",
          marginLeft: 36,
          marginBottom: 12,
          marginTop: 4,
        }}
      >
        <ThemedButton
          onPress={() => setShowPicker(!showPicker)}
          outlined
          title={datetime}
        />
      </ThemedView>
      <ThemedModal visible={showPicker}>
        <ThemedView
          style={{
            justifyContent: "center",
            flex: 1,
          }}
        >
          <ThemedText
            style={{
              marginLeft: 8,
              color: theme.grey2,
              fontWeight: "bold",
            }}
          >
            {datetime}
          </ThemedText>
          <ThemedView style={{ flexDirection: "row" }}>
            <RNPicker
              selectedValue={date}
              onValueChange={(currValue) => {
                onValueChange(dayjs(value).date(Number(currValue)).valueOf());
              }}
            >
              {getDaysInMonth(months[month]).map((item, idx) => (
                <RNPicker.Item
                  key={idx}
                  label={String(item)}
                  style={{ fontSize: 16 }}
                />
              ))}
            </RNPicker>
            <RNPicker
              selectedValue={month}
              onValueChange={(currValue) => {
                onValueChange(dayjs(value).month(Number(currValue)).valueOf());
              }}
            >
              {months.map((item, idx) => (
                <RNPicker.Item
                  key={idx}
                  label={item}
                  value={idx}
                  style={{ fontSize: 16 }}
                />
              ))}
            </RNPicker>
            <RNPicker
              selectedValue={year}
              onValueChange={(currValue) => {
                onValueChange(dayjs(value).year(Number(currValue)).valueOf());
              }}
            >
              {years.map((item, idx) => (
                <RNPicker.Item
                  key={idx}
                  label={String(item)}
                  style={{ fontSize: 16 }}
                />
              ))}
            </RNPicker>
          </ThemedView>
          <ThemedView style={{ flexDirection: "row" }}>
            <RNPicker
              selectedValue={hour}
              onValueChange={(currValue) => {
                onValueChange(dayjs(value).hour(Number(currValue)).valueOf());
              }}
            >
              {hours.map((item, idx) => (
                <RNPicker.Item
                  key={idx}
                  label={String(item)}
                  style={{ fontSize: 16 }}
                />
              ))}
            </RNPicker>
            <RNPicker
              selectedValue={minute}
              onValueChange={(currValue) => {
                onValueChange(dayjs(value).minute(Number(currValue)).valueOf());
              }}
            >
              {minutes.map((item, idx) => (
                <RNPicker.Item
                  key={idx}
                  label={String(item)}
                  style={{ fontSize: 16 }}
                />
              ))}
            </RNPicker>
          </ThemedView>
          <ThemedView
            style={{ flexDirection: "row", justifyContent: "center" }}
          >
            <ThemedButton
              onPress={() => setShowPicker(!showPicker)}
              title="Close"
              outlined
            />
          </ThemedView>
        </ThemedView>
      </ThemedModal>
    </ThemedView>
  );
}
