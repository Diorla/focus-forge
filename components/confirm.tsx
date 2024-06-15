import React from "react";
import { Alert, Platform, TouchableOpacity } from "react-native";

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
        onPress: cancelFn,
        style: "cancel",
      },
      { text: acceptTitle || "OK", onPress: acceptFn },
    ]);

  const prompt = () => {
    const result = confirm(`${title}: ${message}`);
    if (result) acceptFn();
    else cancelFn && cancelFn();
  };
  if (Platform.OS === "web")
    return <TouchableOpacity onPress={prompt}>{children}</TouchableOpacity>;
  return <TouchableOpacity onPress={openAlert}>{children}</TouchableOpacity>;
}
