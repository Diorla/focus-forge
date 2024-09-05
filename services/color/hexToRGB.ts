export default function hexToRGB(hex: string) {
  const value = hex.replaceAll("#", "");
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4), 16);

  return [red, green, blue];
}
