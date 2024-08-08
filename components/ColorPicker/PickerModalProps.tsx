import ColorPickerProps from "./ColorPickerProps";

export default interface PickerModalProps
  extends Omit<ColorPickerProps, "label"> {
  setShowPicker: (show: boolean) => void;
  showPicker: boolean;
}
