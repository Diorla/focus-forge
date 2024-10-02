import { Colors } from "@/constants/Colors";
import { ScrollViewStyleReset } from "expo-router/html";
import { type PropsWithChildren } from "react";

/**
 * This file is web-only and used to configure the root HTML for every web page
 * during static rendering.
 * The contents of this function only run in Node.js environments and do not
 * have access to the DOM or browser APIs.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/*
          Disable body scrolling on web. This makes ScrollView components work
          closer to how they do on native.
          However, body scrolling is often nice to have for mobile web. If you
          want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />

        {/* Using raw CSS styles as an escape-hatch to ensure the background
        color never flickers in dark-mode. */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {/* Add any additional <head> elements that you want globally available
        on web... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: ${Colors.light.grey5};
}
@media (prefers-color-scheme: dark) {
  body {
  background-color: ${Colors.dark.grey0};
  }
}
* {
  outline: none;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: transparent;
}

::-webkit-scrollbar {
  width: 4px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-image: -webkit-gradient(linear,
      left bottom,
      left top,
      color-stop(0.4, ${Colors.light.primary}),
      color-stop(0.8,  ${Colors.dark.primary}));
}

textarea::-webkit-scrollbar {
  width: 1px;
}
div::-webkit-scrollbar {
  height: 4px;
}
`;
