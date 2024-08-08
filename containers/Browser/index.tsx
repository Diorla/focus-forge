import { ThemedView } from "@/components/ThemedView";
import useDataQuery from "@/context/data/useDataQuery";
import { useEffect, useState } from "react";
import ActivityModel from "@/context/data/model/ActivityModel";
import FilterModal from "./FilterModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input } from "@rneui/base";
import Fuse from "fuse.js";
import { ThemedText } from "@/components/ThemedText";
import useUser from "@/context/user/useUser";
import ProjectCard from "@/components/ProjectCard";

export default function BrowserScreen() {
  const { theme } = useUser();
  const { activityList } = useDataQuery();
  const [filteredList, setFilteredList] = useState<ActivityModel[]>([]);
  const [filters, setFilters] = useState("");
  const [sort, setSort] = useState("name");
  const [filterVisible, setFilterVisible] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setFilteredList(activityList);
  }, [activityList, filters]);

  // TODO: set sort and filters function
  const sortFn = (a: ActivityModel, b: ActivityModel) => {
    if (sort === "name") {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
    }
    return 0;
  };

  const fuse = new Fuse(filteredList, { keys: ["name"] });
  const searchResults = fuse.search(search).map((item) => item.item);

  const currentList = search ? searchResults : filteredList;

  return (
    <ThemedView>
      <FilterModal
        visible={filterVisible}
        setFilters={setFilters}
        setSort={setSort}
        closeModal={() => setFilterVisible(false)}
        filters={filters}
        sort={sort}
      />
      <ThemedView
        style={{
          backgroundColor: theme.background,
        }}
      >
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <ThemedView style={{ flex: 1, alignItems: "flex-start" }}>
            <Input
              placeholder="Search"
              style={{ marginTop: 4, marginHorizontal: 4 }}
              onChangeText={setSearch}
            />
          </ThemedView>
          <Ionicons
            name="filter-circle"
            size={36}
            color={theme.text}
            style={{ marginHorizontal: 8 }}
            onPress={() => setFilterVisible(true)}
          />
        </ThemedView>
        <ThemedView>
          <ThemedText
            type="link"
            style={{ textTransform: "capitalize", textAlign: "center" }}
          >
            {sort}, {filters || "No filters"}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      {currentList.sort(sortFn).map((item) => (
        <ProjectCard item={item} />
        // <ActivityCard activity={item} key={item.id} />
      ))}
    </ThemedView>
  );
}
