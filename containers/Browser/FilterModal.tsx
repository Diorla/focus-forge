import ThemedPicker from "@/components/ThemedPicker";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import ThemedModal from "@/components/ThemedModal";

const filterList = [
  {
    label: "None",
    value: "",
  },
  {
    label: "Archived",
    value: "archived",
  },
  {
    label: "Active",
    value: "active",
  },
];

const sortList = [
  {
    label: "None",
    value: "",
  },
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Created",
    value: "created",
  },
  {
    label: "Updated",
    value: "updated",
  },
  {
    label: "Last done",
    value: "last done",
  },
];

export default function FilterModal({
  visible,
  setFilters,
  setSort,
  closeModal,
  sort,
  filters,
}: {
  visible: boolean;
  setFilters: (value: string) => void;
  setSort: (value: string) => void;
  closeModal: () => void;
  filters: string;
  sort: string;
}) {
  return (
    <ThemedModal visible={visible}>
      <ThemedView style={{ marginTop: 52 }} />
      <ThemedView style={{ flex: 1, justifyContent: "space-between" }}>
        <ThemedView>
          <ThemedView style={{ marginVertical: 12 }}>
            <ThemedPicker
              label="Filter"
              value={filters}
              onValueChange={setFilters}
              list={filterList}
            />
          </ThemedView>
          <ThemedView style={{ marginVertical: 12 }}>
            <ThemedPicker
              label="Sort"
              value={sort}
              onValueChange={setSort}
              list={sortList}
            />
          </ThemedView>
        </ThemedView>
        <ThemedView style={{ alignItems: "center", marginBottom: 24 }}>
          <ThemedButton title="Close" onPress={closeModal} />
        </ThemedView>
      </ThemedView>
    </ThemedModal>
  );
}
