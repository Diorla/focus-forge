import { Picker as RNPicker } from "@react-native-picker/picker";
import { Modal, Platform, View } from "react-native";
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
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  list: Array<{ label: string; value: string }>;
}) {
  const theme = useThemeColor();
  const [showPicker, setShowPicker] = useState(false);
  if (Platform.OS === "android")
    return (
      <View>
        <ThemedText
          style={{
            marginLeft: 8,
            color: theme.grey0,
            fontWeight: "bold",
          }}
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
      </View>
    );

  const labelValue =
    list.find((item) => item.value === value)?.label || "No label";
  return (
    <View>
      <ThemedText
        type="subtitle"
        style={{ marginLeft: 8, color: theme.grey2, fontWeight: "bold" }}
      >
        {label}
      </ThemedText>
      <View
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
      </View>
      <Modal visible={showPicker}>
        <View
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
        </View>
      </Modal>
    </View>
  );
}
