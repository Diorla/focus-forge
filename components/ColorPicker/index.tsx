import { useState } from "react";
import { getContrastColor } from "../../services/color";
import { ThemedButton } from "../ThemedButton";
import { ThemedView } from "../ThemedView";
import Label from "../Label";
import ColorPickerProps from "./ColorPickerProps";
import { StatusBar } from "expo-status-bar";
import { PickerModal } from "./PickerModal";

export default function ColorPicker({
  label,
  value,
  onValueChange,
}: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const textColor = getContrastColor(value);

  return (
    <ThemedView>
      <StatusBar style={textColor.includes("0") ? "dark" : "light"} />
      <Label label={label} />
      <ThemedView
        style={{
          alignItems: "flex-start",
          marginLeft: 36,
          marginBottom: 12,
          marginTop: 4,
        }}
      >
        <ThemedButton
          color={textColor}
          title={value}
          onPress={() => setShowPicker(!showPicker)}
          style={{ backgroundColor: value, padding: 4 }}
        />
      </ThemedView>
      <PickerModal
        value={value}
        onValueChange={onValueChange}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
      />
    </ThemedView>
  );
}
