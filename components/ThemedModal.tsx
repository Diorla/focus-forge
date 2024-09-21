import { Modal, ModalProps } from "react-native";
import { ThemedView } from "./ThemedView";
import getMarginLeft from "@/context/user/getMarginLeft";

export default function ThemedModal({ children, style, ...rest }: ModalProps) {
  const marginLeft = getMarginLeft(960);
  return (
    <Modal {...rest}>
      <ThemedView style={[{ flex: 1, marginLeft, maxWidth: 960 }, style]}>
        {children}
      </ThemedView>
    </Modal>
  );
}
