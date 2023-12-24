import { ScrollView, View } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";

export default function RecentView() {
  return (
    <>
      <SectionHeader title="Recent" />
      <ScrollView horizontal>
        <ActivityCard showList={() => console.log("show check list")} />
        <ActivityCard showList={() => console.log("show check list")} />
        <ActivityCard showList={() => console.log("show check list")} />
        <ActivityCard showList={() => console.log("show check list")} />
        <ActivityCard showList={() => console.log("show check list")} />
        <ActivityCard showList={() => console.log("show check list")} />
      </ScrollView>
    </>
  );
}
