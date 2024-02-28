import { Typography } from "../../components";

export default function Comment({
  showComment,
  comment,
}: {
  showComment: boolean;
  comment: string;
}) {
  if (showComment && comment)
    return <Typography type="small">{comment}</Typography>;
  return null;
}
