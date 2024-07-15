import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import useUser from "@/context/user/useUser";
import { Colors } from "@/constants/Colors";

const HEADER_HEIGHT = 250;

export default function ParallaxScrollView({
  children,
  name,
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const { theme } = useUser();
  const oppositeTheme = theme.dark ? Colors.light : Colors.dark;

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: oppositeTheme.primary },
            headerAnimatedStyle,
          ]}
        >
          <Ionicons
            size={310}
            name={name}
            style={[styles.headerImage, { color: theme.primary + 80 }]}
          />
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 160,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    overflow: "hidden",
  },
  headerImage: {
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
