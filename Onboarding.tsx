import { useTheme } from "@rneui/themed";
import { View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import Button from "./components/button";
import AnimatedBackground from "./AnimatedBackground";
import Typography from "./components/typography";

export default function Onboarding({ getStarted }: { getStarted: () => void }) {
  const [index, setIndex] = useState(0);
  const {
    theme: { colors },
  } = useTheme();
  const [prevColor, setPrevColor] = useState(colors.white);

  if (index === 0)
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <AnimatedBackground prevColor={prevColor} />
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            backgroundColor: "transparent",
            alignItems: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("./assets/puzzle.jpg")}
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
              }}
            />
          </View>
          <View style={{ padding: 8 }}>
            <Typography color={colors.white} type="header">
              Break your task into small manageable chunks and reduce their
              difficulty
            </Typography>
            <View style={{ alignItems: "flex-end", marginTop: 8 }}>
              <TouchableOpacity
                onPress={() => {
                  setIndex(index + 1);
                  setPrevColor(colors.primary);
                }}
              >
                <Typography color={colors.white}>Next</Typography>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: colors.grey0,
                borderRadius: 20,
              }}
            />
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: colors.grey4,
                borderRadius: 20,
                marginHorizontal: 20,
              }}
            />
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: colors.grey4,
                borderRadius: 20,
              }}
            />
          </View>
          <Button block onPress={getStarted}>
            Get Started
          </Button>
        </View>
      </View>
    );
  if (index === 1)
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <AnimatedBackground color="secondary" prevColor={prevColor} />
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            backgroundColor: "transparent",
            alignItems: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("./assets/hourglass.jpg")}
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
              }}
            />
          </View>
          <View style={{ padding: 8 }}>
            <Typography color={colors.white} type="header">
              Manage your time more effectively and get the best out of your day
            </Typography>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setIndex(index - 1);

                  setPrevColor(colors.secondary);
                }}
              >
                <Typography color={colors.white}>Prev</Typography>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIndex(index + 1);
                  setPrevColor(colors.secondary);
                }}
              >
                <Typography color={colors.white}>Next</Typography>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: colors.grey4,
                borderRadius: 20,
              }}
            />
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: colors.grey0,
                borderRadius: 20,
                marginHorizontal: 20,
              }}
            />
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: colors.grey4,
                borderRadius: 20,
              }}
            />
          </View>
          <Button block onPress={getStarted}>
            Get Started
          </Button>
        </View>
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AnimatedBackground color="accent" prevColor={prevColor} />
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          backgroundColor: "transparent",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("./assets/deadline.jpg")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
            }}
          />
        </View>
        <View style={{ padding: 8 }}>
          <Typography color={colors.white} type="header">
            Avoid distractions, achieve your goals and beat deadlines
          </Typography>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIndex(index - 1);
                setPrevColor(colors.accent);
              }}
            >
              <Typography color={colors.white}>Prev</Typography>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: colors.grey4,
              borderRadius: 20,
            }}
          />
          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: colors.grey4,
              borderRadius: 20,
              marginHorizontal: 20,
            }}
          />
          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: colors.grey0,
              borderRadius: 20,
            }}
          />
        </View>
        <Button block onPress={getStarted}>
          Get Started
        </Button>
      </View>
    </View>
  );
}
