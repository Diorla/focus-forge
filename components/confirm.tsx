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
  preConfirmFn,
}: {
  children: React.ReactNode;
  title: string;
  message: string;
  acceptTitle?: string;
  cancelTitle?: string;
  acceptFn: () => void;
  cancelFn?: () => void;
  preConfirmFn?: () => void;
}) {
  const openAlert = () => {
    if (preConfirmFn) preConfirmFn();

    Alert.alert(title, message, [
      {
        text: cancelTitle || "Cancel",
        onPress: cancelFn,
        style: "cancel",
      },
      { text: acceptTitle || "OK", onPress: acceptFn },
    ]);
  };

  const prompt = () => {
    if (preConfirmFn) preConfirmFn();
    const result = confirm(`${title}: ${message}`);
    if (result) acceptFn();
    else cancelFn && cancelFn();
  };
  if (Platform.OS === "web")
    return <TouchableOpacity onPress={prompt}>{children}</TouchableOpacity>;
  return <TouchableOpacity onPress={openAlert}>{children}</TouchableOpacity>;
}
