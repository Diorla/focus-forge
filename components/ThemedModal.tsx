import { Modal, ModalProps } from "react-native";
import { ThemedView } from "./ThemedView";

export default function ThemedModal({ children, style, ...rest }: ModalProps) {
  return (
    <Modal {...rest}>
      <ThemedView style={[{ flex: 1 }, style]}>{children}</ThemedView>
    </Modal>
  );
}
