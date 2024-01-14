import { ListItem } from "@rneui/themed";

export default function Item({
  title,
  children,
  onPress,
}: {
  title: string;
  children: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <ListItem onPress={onPress}>
      {children}
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}
