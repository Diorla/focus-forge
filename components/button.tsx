import {
  ButtonProps as RNButtonProps,
  Button as RNButton,
  useTheme,
} from "@rneui/themed";

interface ButtonProps extends RNButtonProps {
  block?: boolean;
}
export default function Button(props: ButtonProps) {
  const {
    theme: { colors },
  } = useTheme();
  const { color } = props;

  const { block } = props;
  const colorType = color || "primary";
  const currentColor = colors[colorType as string];
  if (block)
    return (
      <RNButton
        type="solid"
        buttonStyle={{ backgroundColor: colors.black }}
        containerStyle={{
          width: 200,
          marginVertical: 10,
        }}
        titleStyle={{ color: colors.white }}
        {...props}
      />
    );
  return (
    <RNButton type="clear" {...props} titleStyle={{ color: currentColor }} />
  );
}
