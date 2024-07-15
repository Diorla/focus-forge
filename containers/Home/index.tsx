import { ScrollView } from "react-native";
import ProgressCard from "./ProgressCard";
import RecentView from "./RecentView";
import TodayView from "./TodayView";
import UpcomingView from "./UpcomingView";
import OverflowView from "./OverflowView";
import PreviousView from "./PreviousView";
import ArchivedView from "./ArchivedView";
import TodoView from "./TodoView";
import useUser from "@/context/user/useUser";

/**
 * This will be based on "done this week" to indicate the total number of activity
 * done over the week, excluding today of course (that will be in the recent view)
 * @returns
 */
export default function HomeScreen() {
  const {
    theme: { background },
  } = useUser();
  return (
    <ScrollView style={{ backgroundColor: background }}>
      <ProgressCard />
      <TodoView />
      <TodayView />
      <UpcomingView />
      <OverflowView />
      <RecentView />
      <PreviousView />
      <ArchivedView />
    </ScrollView>
  );
}
