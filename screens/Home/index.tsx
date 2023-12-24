import { ScrollView, View } from "react-native";
import TopSpace from "../../components/topSpace";
import TabHeader from "../../container/Nav/TabHeader";
import ProgressCard from "./ProgressCard";
import RecentView from "./RecentView";
import TodayView from "./TodayView";
import UpcomingView from "./UpcomingView";
import OverflowView from "./OverflowView";

export default function HomeScreen() {
  return (
    <View>
      <TopSpace />
      <TabHeader />
      <ScrollView>
        <ProgressCard />
        <RecentView />
        <TodayView />
        <UpcomingView />
        <OverflowView />
        <View style={{ height: 200 }} />
      </ScrollView>
    </View>
  );
}
