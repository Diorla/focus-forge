import { useTheme } from "@rneui/themed";
import * as React from "react";
import { Typography } from "../../components";
import { format } from "../../services/datetime";

export default function Header() {
  const { theme } = useTheme();

  return (
    <Typography
      color={theme.colors.white}
      style={{ textAlign: "center", marginBottom: 12 }}
    >
      {format()}
    </Typography>
  );
}
