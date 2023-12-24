import { ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";

export default function OverflowView() {
  return (
    <>
      <SectionHeader title="Overflow" />
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
