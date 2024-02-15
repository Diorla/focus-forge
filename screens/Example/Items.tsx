import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import { openDatabase } from "../../services/db";
import selectRow from "../../services/db/selectRow";

export const db = openDatabase();
export function Items({
  done: doneHeading,
  onPressItem,
}: {
  done: boolean;
  onPressItem;
}) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    selectRow({
      db,
      table: "items",
      model: { done: doneHeading ? 1 : 0 },
      callback: (_, { rows: { _array } }) => setItems(_array),
    });
  }, []);

  const heading = doneHeading ? "Completed" : "Todo";

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id, done, value }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#1c9963" : "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8,
          }}
        >
          <Text style={{ color: done ? "#fff" : "#000" }}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
