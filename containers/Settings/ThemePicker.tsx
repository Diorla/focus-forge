import { Modal, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialIcons } from "@expo/vector-icons";
import useUser from "@/context/user/useUser";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import updateUser from "@/services/database/updateUser";
import { ThemedButton } from "@/components/ThemedButton";
import ThemedModal from "@/components/ThemedModal";
import { useToast } from "react-native-toast-notifications";
import { Icon, ListItem } from "@rneui/themed";

export default function ThemePicker() {
  const [visible, setVisible] = useState(false);
  const {
    user: { mode, id },
    theme: { text },
  } = useUser();
  const [modeValue, setModeValue] = useState<"dark" | "light" | "">("");

  const toast = useToast();

  useEffect(() => {
    setModeValue(mode ?? "");
  }, [mode]);

  return (
    <Pressable onPress={() => setVisible(true)}>
      <ThemedModal visible={visible} style={{ justifyContent: "center" }}>
        <Picker
          onValueChange={(value) => {
            setModeValue(value);
          }}
          selectedValue={modeValue}
          itemStyle={{ color: text }}
        >
          <Picker.Item label="System Default" value="" />
          <Picker.Item label="Dark" value="dark" />
          <Picker.Item label="Light" value="light" />
        </Picker>
        <ThemedView style={{ alignItems: "center", marginVertical: 8 }}>
          <ThemedButton
            title="Close"
            onPress={() => {
              if (mode !== modeValue)
                updateUser({ id, mode: modeValue })
                  .then(() => setVisible(false))
                  .catch((err) => {
                    setVisible(false);
                    toast.show(err.message, { type: "error" });
                  });
            }}
          />
        </ThemedView>
      </ThemedModal>
      <ListItem>
        <Icon name="settings-display" type="material" />
        <ListItem.Content>
          <ListItem.Title>Display Settings</ListItem.Title>
          <ListItem.Subtitle style={{ textTransform: "capitalize" }}>
            {mode || "System default"}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </Pressable>
  );
}
