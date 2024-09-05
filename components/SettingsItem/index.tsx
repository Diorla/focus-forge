import { Link } from "expo-router";
import { Icon, ListItem } from "@rneui/themed";

interface ListItemProps {
  path: string;
  title: string;
  icon: string;
  iconType?: string;
}
export default function SettingsItem({
  path,
  title,
  icon,
  iconType,
}: ListItemProps) {
  return (
    <Link href={`/(tabs)/account/${path}`} asChild>
      <ListItem>
        <Icon name={icon} type={iconType || "ionicon"} />
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </Link>
  );
}
