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
  if (type === "completed") return <ThemedText>{format(lastDone)}</ThemedText>;
  if (type === "recent")
    return <ThemedText>{dayjs(lastDone).fromNow()}</ThemedText>;
  if (type === "overflow") return <ThemedText>Over the limit</ThemedText>;
  if (type === "upcoming") return <ThemedText>Todo this week</ThemedText>;
  return <ThemedText>Done this week</ThemedText>;
}
