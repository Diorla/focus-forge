import React, { useEffect, useState } from "react";
import ModalSelector from "react-native-modal-selector";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import { ThemedView } from "./ThemedView";
import ThemedInput from "./ThemedInput";
import useUser from "@/context/user/useUser";

export default function SelectCategory({
  value,
  setValue,
  list,
}: {
  value: string;
  setValue: (value: string) => void;
  list: string[];
}) {
  const [label, setLabel] = useState("");
  const [data, setData] = useState<{ label: string; key: string }[]>([]);

  const { theme } = useUser();

  useEffect(() => {
    const uniqueList = [...new Set([...list, value])];
    setData(
      uniqueList.map((item) => ({
        label: item,
        key: item,
      }))
    );
  }, [list, value]);

  return (
    <ThemedView style={{ padding: 8 }}>
      <ThemedText type="defaultSemiBold">Select category</ThemedText>
      <ModalSelector
        data={data.sort((a, b) => (a.label > b.label ? 1 : -1))}
        initValue={value}
        onChange={(option) => {
          setValue(option.label);
        }}
        selectedItemTextStyle={{ color: theme.secondary }}
        optionTextStyle={{ color: theme.text }}
        optionStyle={{ backgroundColor: theme.background }}
        optionContainerStyle={{ backgroundColor: theme.background }}
        sectionTextStyle={{ color: theme.text }}
        style={{ flex: 1 }}
        header={
          <ThemedView>
            <ThemedInput
              value={label}
              onChangeText={setLabel}
              placeholder="New category"
            />
            <ThemedView
              style={{ flexDirection: "row", justifyContent: "center" }}
            >
              <ThemedButton
                outlined
                title="Add"
                onPress={() => {
                  if (label) {
                    setData([
                      ...data,
                      {
                        label,
                        key: label,
                      },
                    ]);
                    setValue(label);
                    setLabel("");
                  }
                }}
                color={theme.text}
              />
            </ThemedView>
          </ThemedView>
        }
      >
        <ThemedInput value={value} />
      </ModalSelector>
    </ThemedView>
  );
}
