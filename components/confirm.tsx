import React from "react";
import { Alert, TouchableOpacity } from "react-native";

export default function Confirm({
  children,
  title,
  message,
  acceptTitle,
  cancelTitle,
  acceptFn,
  cancelFn,
}: {
  children: React.ReactNode;
  title: string;
  message: string;
  acceptTitle?: string;
  cancelTitle?: string;
  acceptFn: () => void;
  cancelFn?: () => void;
}) {
  const openAlert = () =>
    Alert.alert(title, message, [
      {
        text: cancelTitle || "Cancel",
        onPress: cancelFn || null,
        style: "cancel",
      },
      { text: acceptTitle || "OK", onPress: acceptFn },
    ]);

  return <TouchableOpacity onPress={openAlert}>{children}</TouchableOpacity>;
}
