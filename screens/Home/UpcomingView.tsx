import { ScrollView, View } from "react-native";
import ActivityCard from "./ActivityCard";
import SectionHeader from "./SectionHeader";

export default function UpcomingView() {
  return (
    <>
      <SectionHeader title="Upcoming" />
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
