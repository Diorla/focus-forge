import dayjs from "dayjs";
import { WebDateTimePickerProps } from "./WebDateTimePickerProps";
import useUser from "@/context/user/useUser";
import { useRef } from "react";

export default function WebDateTimePicker({
  value,
  onValueChange,
}: WebDateTimePickerProps) {
  const datetime = dayjs(value).format("YYYY-MM-DDTHH:mm");
  const { theme } = useUser();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <style>{`
        ::-webkit-calendar-picker-indicator {
          background: ${theme.text};
        }
      `}</style>
      <input
        ref={ref}
        style={{
          color: theme.text,
          backgroundColor: theme.background,
          border: `1px solid ${theme.grey0}`,
          borderRadius: 4,
          margin: 4,
          padding: `4px 8px`,
        }}
        type="datetime-local"
        value={datetime}
        onChange={(e) => {
          onValueChange(dayjs(e.target.value).valueOf());
        }}
      />
    </>
  );
}
