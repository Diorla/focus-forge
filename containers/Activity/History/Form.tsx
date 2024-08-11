import { CheckBox, Input } from "@rneui/themed";
import TimeInput from "@/components/TimeInput";
import DatePicker from "@/components/DateTimePicker";
import DoneType from "@/context/data/types/DoneType";
import { ThemedView } from "@/components/ThemedView";

export default function Form({
  doneItem,
  isOccurrence,
  setDoneItem,
}: {
  doneItem: DoneType;
  isOccurrence: boolean;
  setDoneItem: (value: DoneType) => void;
}) {
  return (
    <>
      {!isOccurrence && (
        <TimeInput
          value={doneItem.length}
          onChange={(length) => setDoneItem({ ...doneItem, length })}
        />
      )}
      <Input
        label="Note"
        value={doneItem.comment}
        onChangeText={(comment) => setDoneItem({ ...doneItem, comment })}
        multiline
      />
      {isOccurrence && (
        <ThemedView>
          <CheckBox
            checked={!!doneItem.length}
            onPress={() => {
              setDoneItem({
                ...doneItem,
                length: doneItem.length ? 0 : 1,
              });
            }}
            title="Completed"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
        </ThemedView>
      )}
      <DatePicker
        date={doneItem.datetime}
        setDate={(datetime) => setDoneItem({ ...doneItem, datetime })}
        label="Date time"
        mode="datetime"
      />
    </>
  );
}
