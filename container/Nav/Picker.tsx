import { Picker as RNPicker } from "@react-native-picker/picker";
import { Modal, Platform, View } from "react-native";
import { useState } from "react";
import { useTheme } from "@rneui/themed";
import { Button, Typography } from "../../components";

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
      <View style={{ width: "70%" }}>
        <Typography
          style={{
            color: theme.colors.grey3,
            fontWeight: "bold",
          }}
        >
          {label}
        </Typography>
        <RNPicker selectedValue={value} onValueChange={onValueChange}>
          {list.map((item, idx) => (
            <RNPicker.Item key={idx} {...item} />
          ))}
        </RNPicker>
      </View>
    );

  const labelValue = list.find((item) => item.value === value).label;
  return (
    <View>
      <Typography
        type="big"
        style={{ color: theme.colors.grey3, fontWeight: "bold" }}
      >
        {label}
      </Typography>
      <View
        style={{
          alignItems: "flex-start",
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
              color: theme.colors.grey3,
              fontWeight: "bold",
            }}
          >
            {label}
          </Typography>
          <RNPicker selectedValue={value} onValueChange={onValueChange}>
            {list.map((item, idx) => (
              <RNPicker.Item key={idx} {...item} />
            ))}
          </RNPicker>
          <Button onPress={() => setShowPicker(!showPicker)}>Close</Button>
        </View>
      </Modal>
    </View>
  );
}
