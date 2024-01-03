import { ScrollView, View } from "react-native";
import TopSpace from "../../components/topSpace";
import TabHeader from "../../container/Nav/TabHeader";
import ProgressCard from "./ProgressCard";
import RecentView from "./RecentView";
import TodayView from "./TodayView";
import UpcomingView from "./UpcomingView";
import OverflowView from "./OverflowView";
import PreviousView from "./PreviousView";

// TODO: Add past activity
/**
 * This will be based on "done this week" to indicate the total number of activity
 * done over the week, excluding today of course (that will be in the recent view)
 * @returns
 */
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
        <PreviousView />
        <View style={{ height: 200 }} />
      </ScrollView>
    </View>
  );
}
