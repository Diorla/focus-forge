import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Profile } from "@/containers/Profile";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView name="person">
      <Profile />
    </ParallaxScrollView>
  );
}
