import { Modal, TouchableOpacity } from "react-native";
import { useState } from "react";
import { getContrastColor, random } from "../services/color";
import Slider from "@react-native-community/slider";
import hexToRGB from "../services/color/hexToRGB";
import RGBToHex from "../services/color/RGBToHex";
import { ThemedButton } from "./ThemedButton";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";

export default function ColorPicker({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const textColor = getContrastColor(value);
  const theme = useThemeColor();

  const [red, green, blue] = hexToRGB(value);

  return (
    <ThemedView>
      <ThemedText
        style={{
          marginLeft: 8,
          color: theme.grey0,
          fontWeight: "bold",
        }}
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
        <TouchableOpacity
          onPress={() => setShowPicker(!showPicker)}
          style={{ backgroundColor: value, padding: 8 }}
        >
          <ThemedText color={textColor}>{value}</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <Modal visible={showPicker}>
        <ThemedView
          style={{
            justifyContent: "space-evenly",
            flex: 1,
            backgroundColor: value,
            padding: 8,
          }}
        >
          <ThemedView>
            <ThemedText color={textColor} type="title">
              Color: {value}
            </ThemedText>
          </ThemedView>
          <ThemedView style={{ padding: 8 }}>
            <Slider
              minimumValue={0}
              maximumValue={255}
              value={red}
              minimumTrackTintColor={theme.background}
              maximumTrackTintColor={theme.text}
              thumbTintColor={`rgb(${red}, 0, 0)`}
              onValueChange={(value) =>
                onValueChange(RGBToHex([Math.floor(value), green, blue]))
              }
            />
            <Slider
              minimumValue={0}
              maximumValue={255}
              value={green}
              minimumTrackTintColor={theme.background}
              maximumTrackTintColor={theme.text}
              thumbTintColor={`rgb(0, ${green}, 0)`}
              onValueChange={(value) =>
                onValueChange(RGBToHex([red, Math.floor(value), blue]))
              }
              style={{ marginVertical: 40 }}
            />
            <Slider
              minimumValue={0}
              maximumValue={255}
              value={blue}
              minimumTrackTintColor={theme.background}
              maximumTrackTintColor={theme.text}
              thumbTintColor={`rgb(0, 0, ${blue})`}
              onValueChange={(value) =>
                onValueChange(RGBToHex([red, green, Math.floor(value)]))
              }
            />
          </ThemedView>
          <ThemedView style={{ alignItems: "center" }}>
            <ThemedButton
              onPress={() => onValueChange(random())}
              title="Randomise"
              outlined
              style={{ marginVertical: 8 }}
              color={textColor}
            />
            <ThemedButton
              onPress={() => setShowPicker(!showPicker)}
              title="Close"
              outlined
              color={textColor}
            />
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}
