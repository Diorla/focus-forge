import * as React from "react";
import { Modal, View } from "react-native";
import { Button, Typography } from "../../components";
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from "@rneui/themed";
import Sort from "./Sort";
import Filter from "./Filter";

export default function SortFilter({
  sort,
  filter,
  setSort,
  setFilter,
  closeModal,
  visible,
}: {
  sort: Sort;
  filter: Filter;
  setSort: (sort: Sort) => void;
  setFilter: (filter: Filter) => void;
  closeModal: () => void;
  visible: boolean;
}) {
  return (
    <Modal visible={visible}>
      <View
        style={{
          marginTop: 56,
          padding: 8,
        }}
      >
        <View style={{ marginBottom: 24 }}>
          <Typography type="big">Sort</Typography>
          <Picker
            selectedValue={sort}
            onValueChange={(itemValue) => setSort(itemValue)}
          >
            <Picker.Item label="Alphabetical" value="alphabetical" />
            <Picker.Item label="Created" value="created" />
            <Picker.Item label="Updated" value="updated" />
            <Picker.Item label="Last done" value="done" />
          </Picker>
        </View>
        <Typography type="big">Filter</Typography>
        <View>
          <CheckBox
            checked={filter === "archived"}
            onPress={() => setFilter("archived")}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Archived"
          />
          <CheckBox
            checked={filter === "completed"}
            onPress={() => setFilter("completed")}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Completed"
          />
          <CheckBox
            checked={filter === "ongoing"}
            onPress={() => setFilter("ongoing")}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Ongoing"
          />
          <CheckBox
            checked={filter === "overflow"}
            onPress={() => setFilter("overflow")}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Overflow"
          />
          <CheckBox
            checked={filter === "all"}
            onPress={() => setFilter("all")}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Show all"
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Button onPress={closeModal}>Close</Button>
        </View>
      </View>
    </Modal>
  );
}
