import { Typography } from "../../components";
import DoneType from "../../context/data/types/DoneType";
import { format } from "../../services/datetime";
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
    const lastDoneItem = done.find((item) => item.datetime === lastDone);
    const endTime = dayjs(lastDoneItem.datetime).add(
      lastDoneItem.length,
      "second"
    );
    if (type === "completed") return <Typography>{format(endTime)}</Typography>;
    return <Typography>{dayjs(endTime).fromNow()}</Typography>;
  }
  if (type === "overflow") return <Typography>Over the limit</Typography>;
  if (type === "upcoming") return <Typography>Todo this week</Typography>;
  return <Typography>Done this week</Typography>;
}
