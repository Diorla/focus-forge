import useUser from "@/context/user/useUser";
import { getContrastColor, hexToRGB, RGBToHex, random } from "@/services/color";
import { ThemedButton } from "../ThemedButton";
import ThemedModal from "../ThemedModal";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import ColorSlider from "./ColorSlider";
import PickerModalProps from "./PickerModalProps";

export function PickerModal({
  value,
  onValueChange,
  setShowPicker,
  showPicker,
}: PickerModalProps) {
  const textColor = getContrastColor(value);
  const { theme } = useUser();
  const [red, green, blue] = hexToRGB(value);
  return (
    <ThemedModal visible={showPicker}>
      <ThemedView
        style={{
          justifyContent: "space-evenly",
          flex: 1,
          backgroundColor: value,
          padding: 16,
        }}
      >
        <ThemedText color={textColor} type="title">
          Color: {value.toUpperCase()}
        </ThemedText>
        <ThemedView
          style={{
            padding: 16,
            backgroundColor: "transparent",
            borderColor: theme.background,
          }}
        >
          <ColorSlider
            value={red}
            color={[red, 0, 0]}
            onValueChange={(value) =>
              onValueChange(RGBToHex([Math.floor(value), green, blue]))
            }
          />
          <ColorSlider
            value={green}
            color={[0, green, 0]}
            onValueChange={(value) =>
              onValueChange(RGBToHex([red, Math.floor(value), blue]))
            }
          />
          <ColorSlider
            value={blue}
            color={[0, 0, blue]}
            onValueChange={(value) =>
              onValueChange(RGBToHex([red, green, Math.floor(value)]))
            }
          />
        </ThemedView>
        <ThemedView
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
          transparent
        >
          <ThemedButton
            onPress={() => onValueChange(random())}
            title="Randomise"
            color={textColor}
          />
          <ThemedButton
            onPress={() => setShowPicker(!showPicker)}
            title="Close"
            color={textColor}
          />
        </ThemedView>
      </ThemedView>
    </ThemedModal>
  );
}
