import { Picker as RNPicker } from "@react-native-picker/picker";
import { Modal, Platform, TextStyle } from "react-native";
import { useState } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Picker({
  label,
  value,
  onValueChange,
  list,
  labelStyle = {},
}: {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  list: Array<{ label: string; value: string }>;
  labelStyle?: TextStyle;
}) {
  const theme = useThemeColor();
  const [showPicker, setShowPicker] = useState(false);
  if (Platform.OS === "android")
    return (
      <ThemedView>
        <ThemedText
          style={[
            {
              marginLeft: 8,
              color: theme.grey0,
              fontWeight: "bold",
            },
            labelStyle,
          ]}
        >
          {label}
        </ThemedText>
        <RNPicker
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
      <ThemedText
        type="subtitle"
        style={{ marginLeft: 8, color: theme.grey2, fontWeight: "bold" }}
      >
        {label}
      </ThemedText>
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
      <Modal visible={showPicker}>
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
      </Modal>
    </ThemedView>
  );
}
