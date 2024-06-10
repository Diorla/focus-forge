import { View, Image, useColorScheme } from "react-native";
import { useState } from "react";
import Dots from "./Dots";
import { logError } from "../../services/database";
import { useToast } from "react-native-toast-notifications";
import useDataQuery from "../../context/data/useDataQuery";
import AnimatedBackground from "../AnimatedBackground";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Onboarding({
  switchRegister,
}: {
  switchRegister: () => void;
}) {
  const [index, setIndex] = useState(0);

  const theme = useThemeColor();
  const [prevColor, setPrevColor] = useState(theme.text);

  const colorList = [theme.primary, theme.secondary, theme.accent];

  const toast = useToast();
  const { restartDB } = useDataQuery();

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
              source={require("../../assets/images/puzzle.jpg")}
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
              }}
            />
          </View>
          <View style={{ padding: 8 }}>
            <ThemedText color={theme.background} type="title">
              Break your task into chunks to reduce their difficulty
            </ThemedText>
            <View style={{ alignItems: "flex-end", marginTop: 8 }}>
              <ThemedButton
                color={theme.background}
                onPress={() => {
                  setIndex(index + 1);
                  setPrevColor(theme.primary);
                }}
                title="Next"
              />
            </View>
          </View>
          <Dots
            activeIndex={index}
            setIndex={(idx) => {
              setPrevColor(colorList[index]);
              setIndex(idx);
            }}
          />
          <ThemedButton
            color={theme.background}
            onPress={switchRegister}
            title="Get Started"
          />
          <ThemedButton
            onPress={() => {
              try {
                restartDB();
                toast.show("Database loaded");
              } catch (error) {
                logError("reloading DB", "profile", error as Error);
              }
            }}
            color={theme.background}
            title="Log in"
            outlined
          />
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
              source={require("../../assets/images/hourglass.jpg")}
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
              }}
            />
          </View>
          <View style={{ padding: 8 }}>
            <ThemedText color={theme.background} type="title">
              Manage your time more effectively to get the best out of your day
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
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
            </View>
          </View>
          <Dots
            activeIndex={index}
            setIndex={(idx) => {
              setPrevColor(colorList[index]);
              setIndex(idx);
            }}
          />
          <ThemedButton
            color={theme.background}
            onPress={switchRegister}
            title="Get Started"
          />
          <ThemedButton
            onPress={() => {
              try {
                restartDB();
                toast.show("Database loaded");
              } catch (error) {
                logError("reloading DB", "profile", error as Error);
              }
            }}
            color={theme.background}
            title="Log in"
            outlined
          />
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
            source={require("../../assets/images/deadline.jpg")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
            }}
          />
        </View>
        <View style={{ padding: 8 }}>
          <ThemedText color={theme.background} type="title">
            Avoid distractions, achieve your goals and beat deadlines
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
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
          </View>
        </View>
        <Dots
          activeIndex={index}
          setIndex={(idx) => {
            setPrevColor(colorList[index]);
            setIndex(idx);
          }}
        />
        <ThemedButton
          color={theme.background}
          onPress={switchRegister}
          title="Get Started"
        />
        <ThemedButton
          onPress={() => {
            try {
              restartDB();
              toast.show("Database loaded");
            } catch (error) {
              logError("reloading DB", "profile", error as Error);
            }
          }}
          color={theme.background}
          title="Log in"
          outlined
        />
      </View>
    </View>
  );
}
