import { Image } from "react-native";
import { useState } from "react";
import Dots from "./Dots";
import AnimatedBackground from "../AnimatedBackground";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";

export default function Onboarding({
  switchRegister,
}: {
  switchRegister: (value: "onboarding" | "register") => void;
}) {
  const [index, setIndex] = useState(0);

  const theme = useThemeColor();
  const [prevColor, setPrevColor] = useState(theme.text);

  const colorList = [theme.primary, theme.secondary, theme.accent];

  if (index === 0)
    return (
      <ThemedView
        style={{
          flex: 1,
        }}
      >
        <AnimatedBackground prevColor={prevColor} />
        <ThemedView
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            backgroundColor: "transparent",
            alignItems: "center",
          }}
        >
          <ThemedView
            style={{ alignItems: "center", backgroundColor: "transparent" }}
          >
            <Image
              source={require("../../assets/images/puzzle.jpg")}
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
              }}
            />
          </ThemedView>
          <ThemedView style={{ padding: 8, backgroundColor: "transparent" }}>
            <ThemedText color={theme.background} type="title">
              Break your task into chunks to reduce their difficulty
            </ThemedText>
            <ThemedView
              style={{
                alignItems: "flex-end",
                marginTop: 8,
                backgroundColor: "transparent",
              }}
            >
              <ThemedButton
                color={theme.background}
                onPress={() => {
                  setIndex(index + 1);
                  setPrevColor(theme.primary);
                }}
                title="Next"
              />
            </ThemedView>
          </ThemedView>
          <Dots
            activeIndex={index}
            setIndex={(idx) => {
              setPrevColor(colorList[index]);
              setIndex(idx);
            }}
          />
          <ThemedButton
            color={theme.background}
            onPress={() => switchRegister("register")}
            title="Get Started"
          />
        </ThemedView>
      </ThemedView>
    );
  if (index === 1)
    return (
      <ThemedView
        style={{
          flex: 1,
        }}
      >
        <AnimatedBackground color="secondary" prevColor={prevColor} />
        <ThemedView
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            backgroundColor: "transparent",
            alignItems: "center",
          }}
        >
          <ThemedView
            style={{ alignItems: "center", backgroundColor: "transparent" }}
          >
            <Image
              source={require("../../assets/images/hourglass.jpg")}
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
              }}
            />
          </ThemedView>
          <ThemedView style={{ padding: 8, backgroundColor: "transparent" }}>
            <ThemedText color={theme.background} type="title">
              Manage your time more effectively to get the best out of your day
            </ThemedText>
            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
                backgroundColor: "transparent",
              }}
            >
              <ThemedButton
                color={theme.background}
                onPress={() => {
                  setIndex(index - 1);
                  setPrevColor(theme.secondary);
                }}
                title="Prev"
              />

              <ThemedButton
                color={theme.background}
                onPress={() => {
                  setIndex(index + 1);
                  setPrevColor(theme.secondary);
                }}
                title="Next"
              />
            </ThemedView>
          </ThemedView>
          <Dots
            activeIndex={index}
            setIndex={(idx) => {
              setPrevColor(colorList[index]);
              setIndex(idx);
            }}
          />
          <ThemedButton
            color={theme.background}
            onPress={() => switchRegister("register")}
            title="Get Started"
          />
        </ThemedView>
      </ThemedView>
    );

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <AnimatedBackground color="accent" prevColor={prevColor} />
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          backgroundColor: "transparent",
          alignItems: "center",
        }}
      >
        <ThemedView
          style={{ alignItems: "center", backgroundColor: "transparent" }}
        >
          <Image
            source={require("../../assets/images/deadline.jpg")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
            }}
          />
        </ThemedView>
        <ThemedView style={{ padding: 8, backgroundColor: "transparent" }}>
          <ThemedText color={theme.background} type="title">
            Avoid distractions, achieve your goals and beat deadlines
          </ThemedText>
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
              backgroundColor: "transparent",
            }}
          >
            <ThemedButton
              color={theme.background}
              onPress={() => {
                setIndex(index - 1);
                setPrevColor(theme.accent);
              }}
              title="Prev"
            />
          </ThemedView>
        </ThemedView>
        <Dots
          activeIndex={index}
          setIndex={(idx) => {
            setPrevColor(colorList[index]);
            setIndex(idx);
          }}
        />
        <ThemedButton
          color={theme.background}
          onPress={() => switchRegister("register")}
          title="Get Started"
        />
      </ThemedView>
    </ThemedView>
  );
}
