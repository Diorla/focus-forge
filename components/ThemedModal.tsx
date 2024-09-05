import { Modal, ModalProps } from "react-native";
import { ThemedView } from "./ThemedView";
import getMarginLeft from "@/context/user/getMarginLeft";

// getMarginLeft(maxWidth)
export default function ThemedModal({ children, style, ...rest }: ModalProps) {
  const marginLeft = getMarginLeft(720);
  return (
    <Modal {...rest}>
      <ThemedView style={[{ flex: 1, marginLeft, maxWidth: 720 }, style]}>
        {children}
      </ThemedView>
    </Modal>
  );
}
