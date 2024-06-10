import { useThemeColor } from "@/hooks/useThemeColor";
import { View, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const enlarge = {
  0: {
    height: 0,
    width: 0,
    transform: [{ scale: 1 }],
  },
  0.5: {
    height: windowHeight,
    width: windowWidth,
  },
  1: {
    height: windowHeight * 2,
    width: windowWidth * 2,
    transform: [{ scale: 4 }],
  },
};

export default function AnimatedBackground({
  color = "primary",
  prevColor,
  externalKey,
}: {
  color?: "primary" | "secondary" | "accent";
  prevColor?: string;
  externalKey?: string;
}) {
  const id = externalKey || Math.random();
  const theme = useThemeColor();
  return (
    <>
      <View
        style={{
          height: windowHeight * 2,
          width: windowWidth,
          backgroundColor: prevColor || theme.background,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></View>
      <Animatable.View
        key={id}
        animation={enlarge}
        duration={3000}
        style={{
          backgroundColor: theme[color],
          width: 0,
          height: 0,
          position: "absolute",
          borderRadius: 10000000,
          left: windowWidth,
          top: windowHeight,
        }}
      />
    </>
  );
}
