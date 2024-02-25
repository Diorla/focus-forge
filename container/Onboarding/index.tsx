import { useTheme } from "@rneui/themed";
import { View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import Button from "../../components/button";
import AnimatedBackground from "../../AnimatedBackground";
import Typography from "../../components/typography";
import Dots from "./Dots";

export default function Onboarding({
  switchRegister,
}: {
  switchRegister: () => void;
}) {
  const [index, setIndex] = useState(0);
  const {
    theme: { colors },
  } = useTheme();
  const [prevColor, setPrevColor] = useState(colors.black);

  const colorList = [colors.primary, colors.secondary, colors.accent];

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
              source={require("../../assets/puzzle.jpg")}
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
              }}
            />
          </View>
          <View style={{ padding: 8 }}>
            <Typography color={colors.white} type="header">
              Break your task into chunks to reduce their difficulty
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
          <Dots
            activeIndex={index}
            setIndex={(idx) => {
              setPrevColor(colorList[index]);
              setIndex(idx);
            }}
          />
          <Button block onPress={switchRegister}>
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
              source={require("../../assets/hourglass.jpg")}
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
              }}
            />
          </View>
          <View style={{ padding: 8 }}>
            <Typography color={colors.white} type="header">
              Manage your time more effectively to get the best out of your day
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
          <Dots
            activeIndex={index}
            setIndex={(idx) => {
              setPrevColor(colorList[index]);
              setIndex(idx);
            }}
          />
          <Button block onPress={switchRegister}>
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
            source={require("../../assets/deadline.jpg")}
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
        <Dots
          activeIndex={index}
          setIndex={(idx) => {
            setPrevColor(colorList[index]);
            setIndex(idx);
          }}
        />
        <Button block onPress={switchRegister}>
          Get Started
        </Button>
      </View>
    </View>
  );
}
