import { Platform } from "react-native";
import { TestIds } from "react-native-google-mobile-ads";
import ads from "../../constants/ads";

export default function getAdsId(type: "banner" | "interstitial" = "banner") {
  const code = Platform.OS === "ios" ? ads.ios[type] : ads.android[type];

  return __DEV__ ? TestIds.ADAPTIVE_BANNER : code;
}
