import { View } from "react-native";
import useUser from "../../context/user/useUser";
import React from "react";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import getAdsId from "../../services/utils/getAdsId";
import dayjs from "dayjs";

const adUnitId = getAdsId();

function Banner() {
  return (
    <BannerAd unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
  );
}

export default function AdsView() {
  const { user } = useUser();
  const diff = dayjs().diff(user.createdAt, "day");

  // Premium and new members (length to be decided) will not see ads
  // I chose 21 because my oldest account is 21 as of the time of this coding
  const isPremium = diff < 21;
  if (isPremium) return null;
  return (
    <View style={{ marginTop: 8 }}>
      <Banner />
    </View>
  );
}
