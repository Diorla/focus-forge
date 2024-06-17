import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Profile } from "@/containers/Profile";

export default function ProfileScreen() {
  return (
    <ParallaxScrollView name="person">
      <Profile />
    </ParallaxScrollView>
  );
}
