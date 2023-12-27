import { Modal, TouchableOpacity, View } from "react-native";
import Typography from "./typography";
import Button from "./button";
import { useState } from "react";
import { useTheme } from "@rneui/themed";
import { getContrastColor, random } from "../services/color";
import Slider from "@react-native-community/slider";
import hexToRGB from "../services/color/hexToRGB";
import RGBToHex from "../services/color/RGBToHex";

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
  const { theme } = useTheme();
  const textColor = getContrastColor(value);

  const [red, green, blue] = hexToRGB(value);

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
      <View
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
          <Typography color={textColor}>{value}</Typography>
        </TouchableOpacity>
      </View>
      <Modal visible={showPicker}>
        <View
          style={{
            justifyContent: "space-evenly",
            flex: 1,
            backgroundColor: value,
            padding: 8,
          }}
        >
          <View>
            <Typography color={textColor} type="header">
              Color: {value}
            </Typography>
          </View>
          <View style={{ padding: 8 }}>
            <Slider
              minimumValue={0}
              maximumValue={255}
              value={red}
              minimumTrackTintColor={theme.colors.white}
              maximumTrackTintColor={theme.colors.black}
              thumbTintColor={`rgb(${red}, 0, 0)`}
              onValueChange={(value) =>
                onValueChange(RGBToHex([Math.floor(value), green, blue]))
              }
            />
            <Slider
              minimumValue={0}
              maximumValue={255}
              value={green}
              minimumTrackTintColor={theme.colors.white}
              maximumTrackTintColor={theme.colors.black}
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
              minimumTrackTintColor={theme.colors.white}
              maximumTrackTintColor={theme.colors.black}
              thumbTintColor={`rgb(0, 0, ${blue})`}
              onValueChange={(value) =>
                onValueChange(RGBToHex([red, green, Math.floor(value)]))
              }
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Button block onPress={() => onValueChange(random())}>
              Randomise
            </Button>
            <Button block onPress={() => setShowPicker(!showPicker)}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}
