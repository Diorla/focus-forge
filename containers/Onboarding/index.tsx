import { useState } from "react";
import AnimatedBackground from "../AnimatedBackground";
import { ThemedView } from "@/components/ThemedView";
import Content from "./Content";
import useUser from "@/context/user/useUser";

export default function Onboarding({
  switchRegister,
}: {
  switchRegister: (value: "onboarding" | "register") => void;
}) {
  const [index, setIndex] = useState(0);

  const { theme } = useUser();
  const [prevColor, setPrevColor] = useState(theme.text);

  if (index === 0)
    return (
      <ThemedView
        style={{
          flex: 1,
        }}
      >
        <AnimatedBackground prevColor={prevColor} />
        <Content
          switchRegister={switchRegister}
          nextClick={() => {
            setPrevColor(theme.primary);
            setIndex(index + 1);
          }}
          prevClick={() => {
            setPrevColor(theme.primary);
            setIndex(index - 1);
          }}
          setIndex={setIndex}
          index={index}
          source={require("../../assets/images/puzzle.jpg")}
          title="Break your task into chunks to reduce their difficulty"
        />
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
        <Content
          switchRegister={switchRegister}
          nextClick={() => {
            setPrevColor(theme.secondary);
            setIndex(index + 1);
          }}
          prevClick={() => {
            setPrevColor(theme.secondary);
            setIndex(index - 1);
          }}
          setIndex={setIndex}
          index={index}
          source={require("../../assets/images/hourglass.jpg")}
          title="Manage your time more effectively to get the best out of your day"
        />
      </ThemedView>
    );

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <AnimatedBackground color="accent" prevColor={prevColor} />
      <Content
        switchRegister={switchRegister}
        nextClick={() => {
          setPrevColor(theme.accent);
          setIndex(index + 1);
        }}
        prevClick={() => {
          setPrevColor(theme.accent);
          setIndex(index - 1);
        }}
        setIndex={setIndex}
        index={index}
        source={require("../../assets/images/deadline.jpg")}
        title="Avoid distractions, achieve your goals and beat deadlines"
      />
    </ThemedView>
  );
}
