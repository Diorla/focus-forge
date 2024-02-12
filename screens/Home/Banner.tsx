import React from "react";
import { Platform } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const code =
  Platform.OS === "ios"
    ? "ca-app-pub-6242148548602613~9209243748"
    : "ca-app-pub-6242148548602613~2751646601";

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : code;

export default function Banner() {
  return (
    <BannerAd unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
  );
}
