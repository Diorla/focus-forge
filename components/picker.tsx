import { Picker as RNPicker } from "@react-native-picker/picker";
import { Modal, Platform, View } from "react-native";
import Typography from "./typography";
import Button from "./button";
import { useState } from "react";
import { useTheme } from "@rneui/themed";

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
  const [showPicker, setShowPicker] = useState(false);
  const { theme } = useTheme();
  if (Platform.OS === "android")
    return (
      <View>
        <Typography
          style={{
            marginLeft: 8,
            color: theme.colors.grey3,
            fontWeight: "bold",
          }}
        >
          {label}
        </Typography>
        <RNPicker selectedValue={value} onValueChange={onValueChange}>
          {list.map((item, idx) => (
            <RNPicker.Item key={idx} {...item} style={{ fontSize: 16 }} />
          ))}
        </RNPicker>
      </View>
    );

  const labelValue = list.find((item) => item.value === value).label;
  return (
    <View>
      <Typography
        type="big"
        style={{ marginLeft: 8, color: theme.colors.grey3, fontWeight: "bold" }}
      >
        {label}
      </Typography>
      <View
        style={{
          alignItems: "flex-start",
          marginLeft: 36,
          marginBottom: 12,
          marginTop: 4,
        }}
      >
        <Button onPress={() => setShowPicker(!showPicker)} type="outline">
          {labelValue}
        </Button>
      </View>
      <Modal visible={showPicker}>
        <View
          style={{
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Typography
            style={{
              marginLeft: 8,
              color: theme.colors.grey3,
              fontWeight: "bold",
            }}
          >
            {label}
          </Typography>
          <RNPicker selectedValue={value} onValueChange={onValueChange}>
            {list.map((item, idx) => (
              <RNPicker.Item key={idx} {...item} style={{ fontSize: 16 }} />
            ))}
          </RNPicker>
          <Button onPress={() => setShowPicker(!showPicker)}>Close</Button>
        </View>
      </Modal>
    </View>
  );
}
