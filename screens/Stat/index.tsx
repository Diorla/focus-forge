import { Card, useTheme } from "@rneui/themed";
import * as React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import TopSpace from "../../components/topSpace";
import ProgressView from "./ProgressView";
import Header from "./Header";
import useNavigate from "../../container/Nav/useNavigate";

export default function StatScreen() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <View>
      <View style={{ backgroundColor: theme.colors.primary }}>
        <TopSpace />
        <Header />
      </View>
      <ScrollView
        style={{
          backgroundColor: theme.colors.primary,
        }}
      >
        <ProgressView />
        <View
          style={{
            backgroundColor: theme.colors.white,
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={() => navigate("ViewStat", { type: "compare" })}
            >
              <Card
                containerStyle={{
                  width: "40%",
                  minWidth: 140,
                  maxWidth: 180,
                }}
              >
                <Card.Title>Compare</Card.Title>
                <Card.Divider />
                <Card.Image source={require("../../assets/versus.png")} />
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigate("ViewStat", { type: "daily" })}
            >
              <Card
                containerStyle={{ width: "40%", minWidth: 140, maxWidth: 180 }}
              >
                <Card.Title>Daily stats</Card.Title>
                <Card.Divider />
                <Card.Image source={require("../../assets/daily.png")} />
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate("ViewStat", { type: "trends" })}
            >
              <Card
                containerStyle={{ width: "40%", minWidth: 140, maxWidth: 180 }}
              >
                <Card.Title>Trends</Card.Title>
                <Card.Divider />
                <Card.Image source={require("../../assets/trend.png")} />
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate("ViewStat", { type: "general" })}
            >
              <Card
                containerStyle={{ width: "40%", minWidth: 140, maxWidth: 180 }}
              >
                <Card.Title>General stat</Card.Title>
                <Card.Divider />
                <Card.Image source={require("../../assets/graph.png")} />
              </Card>
            </TouchableOpacity>
          </View>
          <View style={{ height: 270 }} />
        </View>
      </ScrollView>
    </View>
  );
}
