import { Picker as RNPicker } from "@react-native-picker/picker";
import { Platform } from "react-native";
import { useState } from "react";
import { ThemedText } from "../ThemedText";
import { ThemedButton } from "../ThemedButton";
import { ThemedView } from "../ThemedView";
import ThemedModal from "../ThemedModal";
import useUser from "@/context/user/useUser";
import ThemedPickerProps from "./ThemedPickerProps";
import Label from "../Label";

export default function ThemedPicker({
  label,
  value,
  onValueChange,
  list,
  labelStyle = {},
}: ThemedPickerProps) {
  const { theme } = useUser();
  const [showPicker, setShowPicker] = useState(false);
  if (Platform.OS === "android")
    return (
      <ThemedView>
        <Label label={label || ""} style={labelStyle} />
        <RNPicker
          itemStyle={{ color: theme.text }}
          selectedValue={value}
          onValueChange={onValueChange}
          style={{ color: theme.grey0 }}
        >
          {list.map((item, idx) => (
            <RNPicker.Item key={idx} {...item} style={{ fontSize: 16 }} />
          ))}
        </RNPicker>
      </ThemedView>
    );

  const labelValue =
    list.find((item) => item.value === value)?.label || "No label";
  return (
    <ThemedView>
      <Label label={label || ""} style={labelStyle} />
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
          title={labelValue}
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
            {label}
          </ThemedText>
          <RNPicker selectedValue={value} onValueChange={onValueChange}>
            {list.map((item, idx) => (
              <RNPicker.Item key={idx} {...item} style={{ fontSize: 16 }} />
            ))}
          </RNPicker>
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
