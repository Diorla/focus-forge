import { useEffect, useState } from "react";
import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";
import getAdsId from "../../services/utils/getAdsId";
import useActivity from "../../context/activity/useActivity";

const adUnitId = getAdsId("interstitial");

export default function useInterstitial() {
  const [loaded, setLoaded] = useState(false);
  const { activities } = useActivity();

  const keywords = activities.map((item) => item.name);

  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords,
  });

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    interstitial.load();

    return unsubscribe;
  }, []);

  return {
    loaded,
    interstitial,
  };
}
