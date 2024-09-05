import TimeInput from "@/components/TimeInput";
import useUser from "@/context/user/useUser";

export function DayInput({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: () => void;
  label: string;
}) {
  const { theme } = useUser();
  return (
    <TimeInput
      value={value}
      onChange={onChange}
      label={label}
      containerStyle={{
        marginHorizontal: 8,
        borderWidth: 2,
        minWidth: 150,
        borderColor: theme.grey3,
        borderRadius: 4,
      }}
    />
  );
}
