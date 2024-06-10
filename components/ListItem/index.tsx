import { Link } from "expo-router";
import { Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import ListItemIcon from "./ListItemIcon";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

interface ListItemProps
  extends IconProps<ComponentProps<typeof Ionicons>["name"]> {
  path: string;
  title: string;
}
export default function ListItem({ path, title, ...rest }: ListItemProps) {
  return (
    <Link href={`/(tabs)/account/${path}`} asChild>
      <Pressable style={{ flexDirection: "row", paddingVertical: 8 }}>
        <ThemedText type="link" style={{ marginRight: 20 }}>
          <ListItemIcon {...rest} />
        </ThemedText>
        <ThemedText type="link">{title}</ThemedText>
      </Pressable>
    </Link>
  );
}
