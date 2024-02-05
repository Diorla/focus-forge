import { Input, useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import ModalSelector from "react-native-modal-selector";
import Button from "./button";
import Typography from "./typography";

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
  const [data, setData] = useState([]);

  const { theme } = useTheme();
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
    <View style={{ padding: 8 }}>
      <Typography type="label">Select category</Typography>
      <ModalSelector
        data={data.sort((a, b) => (a.label > b.label ? 1 : -1))}
        initValue={value}
        onChange={(option) => {
          setValue(option.label);
        }}
        selectedItemTextStyle={{ color: theme.colors.secondary }}
        optionTextStyle={{ color: theme.colors.grey0 }}
        style={{ flex: 1 }}
        header={
          <View>
            <TextInput
              value={label}
              onChangeText={setLabel}
              style={{
                borderColor: "silver",
                borderWidth: 1,
                padding: 8,
                margin: 4,
              }}
            />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
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
              />
            </View>
          </View>
        }
      >
        <Input value={value} />
      </ModalSelector>
    </View>
  );
}
