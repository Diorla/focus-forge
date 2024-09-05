import useUser from "@/context/user/useUser";
import Slider from "@react-native-community/slider";

export default function ColorSlider({
  value,
  color,
  onValueChange,
}: {
  value: number;
  color: [number, number, number];
  onValueChange: (value: number) => void;
}) {
  const { theme } = useUser();
  const [red, green, blue] = color;
  return (
    <Slider
      minimumValue={0}
      maximumValue={255}
      value={value}
      minimumTrackTintColor={theme.grey0}
      maximumTrackTintColor={theme.grey5}
      thumbTintColor={`rgb(${red}, ${green}, ${blue})`}
      onValueChange={(value) => onValueChange(value)}
    />
  );
}
