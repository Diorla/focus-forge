import { ScrollView, View, Image } from "react-native";
import { Typography } from "../../components";
import useUser from "../../context/user/useUser";
import TopSpace from "../../components/topSpace";
import { format } from "../../services/date";
import { Card, Divider, useTheme } from "@rneui/themed";
import * as Progress from "react-native-progress";
import TxtButton from "../../components/txtButton";
import { MaterialIcons } from "@expo/vector-icons";
import ActivityCard from "./ActivityCard";
import { TodayCard } from "./TodayCard";

export default function HomeScreen() {
  const {
    user: { name },
  } = useUser();
  const {
    theme: { colors },
  } = useTheme();
  return (
    <ScrollView>
      <TopSpace />
      <View
        style={{
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            marginHorizontal: 20,
          }}
        />
        <View>
          <Typography type="big">{name}</Typography>
          <Typography>{format()}</Typography>
        </View>
      </View>

      <Card
        containerStyle={{
          backgroundColor: colors.primary,
          borderRadius: 8,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Progress.Circle
            size={100}
            progress={0.75}
            color={colors.grey5}
            unfilledColor={colors.grey0}
            borderColor={colors.grey0}
          />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Typography type="header" color={colors.white}>
              Progress
            </Typography>
            <Divider style={{ marginVertical: 10 }} />
            <Typography color={colors.white}>
              12/15 activities completed
            </Typography>
            <Typography color={colors.white}>1h 30 remaining</Typography>
          </View>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 8,
        }}
      >
        <Typography type="header">Recent</Typography>
        <TxtButton>View all</TxtButton>
      </View>
      <ScrollView horizontal>
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
      </ScrollView>
      <View style={{ marginVertical: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <Typography type="header">Today</Typography>
          <TxtButton>Expand</TxtButton>
        </View>
        <View>
          <TodayCard
            onExpand={() => console.log("expanding")}
            showList={() => console.log("show check list")}
            togglePlay={() => console.log("play pause")}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={36}
            color="black"
            onPress={() => console.log("show all of today")}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 8,
        }}
      >
        <Typography type="header">Upcoming</Typography>
        <TxtButton>View all</TxtButton>
      </View>
      <ScrollView horizontal>
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 8,
          marginTop: 8,
        }}
      >
        <Typography type="header">Overflow</Typography>
        <TxtButton>View all</TxtButton>
      </View>
      <ScrollView horizontal>
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
        <ActivityCard
          onExpand={() => console.log("expanding")}
          showList={() => console.log("show check list")}
        />
      </ScrollView>
      <View style={{ height: 76 }} />
    </ScrollView>
  );
}
