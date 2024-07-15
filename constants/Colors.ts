/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export type ColorType = {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  grey0: string;
  grey1: string;
  grey2: string;
  grey3: string;
  grey4: string;
  grey5: string;
  success: string;
  warning: string;
  error: string;
  dark: boolean;
};

export const Colors: { light: ColorType; dark: ColorType } = {
  light: {
    text: "#11181C",
    background: "#ffffff",
    primary: "#6a13e3",
    secondary: "#009497",
    accent: "#b21d51",
    grey0: "#393e42",
    grey1: "#43484d",
    grey2: "#5e6977",
    grey3: "#86939e",
    grey4: "#bdc6cf",
    grey5: "#e1e8ee",
    success: "#52c41a",
    warning: "#faad14",
    error: "#ff190c",
    dark: false,
  },
  dark: {
    text: "#ffffff",
    background: "#11181C",
    primary: "#c69efa",
    secondary: "#80dddb",
    accent: "#ec8ca9",
    grey0: "#e1e8ee",
    grey1: "#bdc6cf",
    grey2: "#86939e",
    grey3: "#5e6977",
    grey4: "#43484d",
    grey5: "#393e42",
    success: "#439946",
    warning: "#cfbe27",
    error: "#bf2c24",
    dark: true,
  },
};
