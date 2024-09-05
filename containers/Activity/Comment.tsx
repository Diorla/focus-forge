import { ThemedText } from "@/components/ThemedText";

export default function Comment({
  showComment,
  comment,
}: {
  showComment: boolean;
  comment: string;
}) {
  if (showComment && comment)
    return <ThemedText type="caption">{comment}</ThemedText>;
  return null;
}
