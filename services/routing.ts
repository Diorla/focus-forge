import { router } from "expo-router";

export default function goBack() {
  if (router.canGoBack()) router.back();
  return router.push("/");
}
