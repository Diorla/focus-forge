import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ImageSourcePropType, Image, Platform } from "react-native";
import Dots from "./Dots";
import Download from "./Download";

export default function Content({
  prevClick,
  nextClick,
  setIndex,
  switchRegister,
  index,
  source,
  title,
}: {
  prevClick: () => void;
  nextClick: () => void;
  setIndex: (arg: number) => void;
  switchRegister: (value: "onboarding" | "register") => void;
  index: number;
  source: ImageSourcePropType | undefined;
  title: string;
}) {
  const theme = useThemeColor();
  const prevDisabled = index === 0;
  const nextDisabled = index === 2;

  return (
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
          source={source}
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
          }}
        />
      </ThemedView>
      <ThemedView style={{ padding: 8, backgroundColor: "transparent" }}>
        <ThemedText color={theme.background} type="title">
          {title}
        </ThemedText>
        <ThemedView
          style={{
            alignItems: "flex-end",
            marginTop: 8,
            backgroundColor: "transparent",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <ThemedButton
            color={theme.background}
            onPress={!prevDisabled ? prevClick : undefined}
            title="Prev"
            disabled={index === 0}
          />
          <ThemedButton
            color={theme.background}
            onPress={!nextDisabled ? nextClick : undefined}
            title="Next"
            disabled={index === 2}
          />
        </ThemedView>
      </ThemedView>
      <Dots
        activeIndex={index}
        setIndex={(idx) => {
          setIndex(idx);
        }}
      />
      <ThemedButton
        color={theme.background}
        onPress={() => switchRegister("register")}
        title="Get Started"
      />
      {Platform.OS === "web" ? <Download /> : null}
    </ThemedView>
  );
}
