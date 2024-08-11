import { Card } from "@rneui/themed";
import { useEffect, useState } from "react";
import useUser from "@/context/user/useUser";
import HistoryProps from "./HistoryProps";
import generateHistory from "./generateHistory";
import PageLoader from "@/components/PageLoader";
import Header from "./Header";
import dayjs from "dayjs";
import ModalForm from "./ModalForm";
import ActivityModel from "@/context/data/model/ActivityModel";
import DailyList from "./DailyList";

export default function History({ activity }: { activity: ActivityModel }) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<{
    [date: string]: HistoryProps[];
  }>({});
  const [showForm, setShowForm] = useState(false);
  const { theme } = useUser();
  const { done = {} } = activity;

  useEffect(() => {
    setHistory(generateHistory(done));
    setLoading(false);
  }, [done]);

  const sortedHistory = Object.keys(history).sort(
    (a, b) => dayjs(b).valueOf() - dayjs(a).valueOf()
  );

  if (loading) return <PageLoader />;
  return (
    <Card
      containerStyle={{
        backgroundColor: theme.background,
      }}
    >
      <ModalForm
        activity={activity}
        visible={showForm}
        closeModal={() => setShowForm(false)}
      />
      <Header
        toggleForm={() => {
          setShowForm(true);
        }}
      />
      {sortedHistory.map((date) => (
        <DailyList
          date={date}
          key={date}
          list={history[date]}
          isOccurrence={activity.isOccurrence}
          activityId={activity.id}
        />
      ))}
    </Card>
  );
}
