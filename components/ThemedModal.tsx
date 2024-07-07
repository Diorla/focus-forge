import { Modal, ModalProps } from "react-native";
import { ThemedView } from "./ThemedView";

export default function ThemedModal({ children, ...rest }: ModalProps) {
  return (
    <Modal {...rest}>
      <ThemedView style={{ flex: 1 }}>{children}</ThemedView>
    </Modal>
  );
}
