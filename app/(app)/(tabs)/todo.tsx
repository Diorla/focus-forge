import ParallaxScrollView from "@/components/ParallaxScrollView";
import TodolistScreen from "@/containers/Todolist";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView name="list-circle-outline">
      <TodolistScreen />
    </ParallaxScrollView>
  );
}
