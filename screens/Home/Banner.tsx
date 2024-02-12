import React from "react";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import getAdsId from "../../services/utils/getAdsId";

const adUnitId = getAdsId();

export default function Banner() {
  return (
    <BannerAd unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
  );
}
