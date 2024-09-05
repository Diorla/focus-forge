import ParallaxScrollView from "@/components/ParallaxScrollView";
import BrowserScreen from "@/containers/Browser";

export default function BrowserTab() {
  return (
    <ParallaxScrollView name="search-circle-outline">
      <BrowserScreen />
    </ParallaxScrollView>
  );
}
