import { ThemedText } from "@/components/ThemedText";
import DoneType from "@/context/data/types/DoneType";
import { format } from "@/services/datetime";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface CardInfoProps {
  type: "completed" | "overflow" | "upcoming" | "previous" | "recent";
  done: DoneType[];
  lastDone: number;
}

export default function CardInfo({ type, done, lastDone }: CardInfoProps) {
  if (type === "completed" || type === "recent") {
    const lastDoneItem = done.find((item) => item.datetime === lastDone) || {
      datetime: 0,
      length: 0,
    };
    const endTime = dayjs(lastDoneItem.datetime).add(
      lastDoneItem.length,
      "second"
    );
    if (type === "completed") return <ThemedText>{format(endTime)}</ThemedText>;
    return <ThemedText>{dayjs(endTime).fromNow()}</ThemedText>;
  }
  if (type === "overflow") return <ThemedText>Over the limit</ThemedText>;
  if (type === "upcoming") return <ThemedText>Todo this week</ThemedText>;
  return <ThemedText>Done this week</ThemedText>;
}
