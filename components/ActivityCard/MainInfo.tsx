import { Divider } from "@rneui/themed";
import dayjs from "dayjs";
import TimeFormat from "@/components/TimeFormat";
import Schedule from "@/context/schedule/Schedule";
import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";
import CardInfo from "./CardInfo";
import generateCardTime from "./generateCardTime";

export default function MainInfo({
  schedule,
  type,
}: {
  schedule: Schedule;
  type: "completed" | "overflow" | "upcoming" | "previous" | "recent";
}) {
  const { theme } = useUser();
  const { done, lastDone } = schedule;

  return (
    <ThemedView
      style={{
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <TimeFormat value={generateCardTime(type, schedule)} />
      <Divider
        color={theme.grey5}
        style={{ width: "50%", marginVertical: 2 }}
      />
      <CardInfo
        type={type}
        done={Object.keys(done).map((item) => {
          return {
            ...done[item],
            datetime: dayjs(item).valueOf(),
          };
        })}
        lastDone={lastDone}
      />
    </ThemedView>
  );
}
