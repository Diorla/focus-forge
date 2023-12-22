import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Typography from "./typography";

export interface TxtButtonProps extends TouchableOpacityProps {
  children: string | number | (string | number)[];
  color?: string;
}

export default function TxtButton(props: TxtButtonProps) {
  return (
    <TouchableOpacity {...props}>
      <Typography color={props.color}>{props.children}</Typography>
    </TouchableOpacity>
  );
}
