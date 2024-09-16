import { usePathname } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

const transformTitle = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export default function useTitle() {
  const pathname = usePathname();

  useEffect(() => {
    const paths = pathname.split("/");
    const title = paths[paths.length - 1];
    if (Platform.OS === "web") {
      document.title = `Focus forge | ${transformTitle(title || "Home")}`;
    }
  }, [pathname]);
}
