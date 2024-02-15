import { useState, useEffect } from "react";
import { Platform, ScrollView, Text, TextInput, View } from "react-native";
import {
  ModelMap,
  createTable,
  insertRow,
  openDatabase,
} from "../../services/db";
import { Items } from "./Items";
import styles from "./styles";
import { useForceUpdate } from "./useForceUpdate";

export const db = openDatabase();

export default function Example() {
  const [text, setText] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  useEffect(() => {
    const data: ModelMap = {
      id: {
        type: "INTEGER",
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      done: {
        type: "INTEGER",
        defaultValue: 0,
      },
      value: {
        type: "TEXT",
      },
    };

    createTable(db, "items", data);
  }, []);

  const add = (text: string) => {
    if (text === null || text === "") {
      return false;
    }

    insertRow({
      db,
      table: "items",
      callback: forceUpdate,
      data: { done: 0, value: text },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SQLite Example</Text>

      {Platform.OS === "web" ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.heading}>
            Expo SQlite is not supported on web!
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.flexRow}>
            <TextInput
              onChangeText={(text) => setText(text)}
              onSubmitEditing={() => {
                add(text);
                setText(null);
              }}
              placeholder="what do you need to do?"
              style={styles.input}
              value={text}
            />
          </View>
          <ScrollView style={styles.listArea}>
            <Items
              key={`forceupdate-todo-${forceUpdateId}`}
              done={false}
              onPressItem={(id) =>
                db.transaction(
                  (tx) => {
                    tx.executeSql("update items set done = 1 where id = ?;", [
                      id,
                    ]);
                  },
                  null,
                  forceUpdate
                )
              }
            />
            <Items
              done
              key={`forceupdate-done-${forceUpdateId}`}
              onPressItem={(id) =>
                db.transaction(
                  (tx) => {
                    tx.executeSql("delete from items where id = ?;", [id]);
                  },
                  null,
                  forceUpdate
                )
              }
            />
          </ScrollView>
        </>
      )}
    </View>
  );
}
